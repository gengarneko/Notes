# 通过 Vue.js 实现动态表单一次提交多个咖啡店位置信息

[上一篇教程](https://laravelacademy.org/post/9625.html)中，我们创建了相应的数据表结构来存储咖啡店与冲泡方法的多对多关联以及获取方法，现在我们需要在其基础上来调整新增咖啡店表单：由于一个咖啡店可能有多个分店，我们可能需要多个位置字段（具体数目未知），因此需要一个动态表单。通过 Vue.js 我们可以轻松实现这样的动态表单。

## Step 1：构思新的 NewCafe.vue 组件功能

很显然，我们需要对 `NewCafe.vue` 表单组件进行重构，在此之前，需要先构思下我们要实现什么样子的功能。

我们已经实现了新增咖啡店的功能，但是这个表单只支持单个地理位置，而有些咖啡店可能散布在多个地方（可以理解为多个分店），这些分店都有一个共同的父节点（可以理解为总店），它们共享同一个咖啡店名称、网址、简介等信息、每个咖啡店，不管是总店还是分店，都会支持多个冲泡方法，最后我们会将总店和分店信息分别存储到 `cafes` 表的不同记录中，并且以某种方式进行关联。

总店和分店区别主要体现在：

- 具体地址
- 位置名称（唯一标识位置）
- 冲泡方法

在具体的提交表单中，需要提供一个添加位置的按钮来添加标识咖啡店位置的字段以及移除位置的按钮来移除与之关联的位置字段，这样，发送给服务器的数据结构也将需要做相应的调整，因此，不仅仅是渲染表单的 HTML 需要调整，还需要调整 Vuex 模块方法和 API 调用，在[上一篇教程](https://laravelacademy.org/post/9625.html#toc_5)中，我们已经设置好用于存放冲泡方法的 Vuex 模块 `brewMethods`，除此之外，还需要做如下这些调整：

- 保存咖啡店的分发动作
- 提交咖啡店到服务器端 JavaScript API
- 更新服务器端验证逻辑来接收新的表单数据
- 修改服务器端保存数据到数据库的业务逻辑

接下来，我们将按照这个思路一步一步完成本教程需要实现的动态表单提交功能。

## Step 2：开始编辑 NewCafe.vue 组件代码

打开 `resources/assets/js/pages/NewCafe.vue` 组件文件，首先需要从 `data()` 方法中移除老的地址相关字段，然后添加 `locations` 数组以及几个新的字段，同时从 `validations` 中移除老的验证字段并添加 `locations` 数组以及 `oneLocation` 等新字段验证规则，这样，新的 `data()` 方法代码如下：

```js
data() {
   return {
       name: '',
       locations: [],
       website: '',
       description: '',
       roaster: false,
       validations: {
           name: {
               is_valid: true,
               text: ''
           },
           locations: [],
           oneLocation: {
               is_valid: true,
               text: ''
           },
           website: {
               is_valid: true,
               text: ''
           }
       }
   }
},
```

`locations` 数组用于存放所有新增的位置字段数据，`validations` 中的 `locations` 数组也会包含每个字段的验证规则，这样就能确保添加的每个位置字段数据都是有效的。`oneLocation` 验证规则用于确保咖啡店至少包含一个位置信息。而 `websites` 和 `description` 都是新增的字段，用于表示咖啡店的网址和简介信息。

接下来，需要添加 `addLocation()` 方法到 `methods` 方法列表中，该方法用于新增一个位置区块到表单中，并在组件创建后进行调用，`addLocation()` 方法代码如下：

```js
addLocation() {
    this.locations.push({name: '', address: '', city: '', state: '', zip: '', methodsAvailable: []});
    this.validations.locations.push({
        address: {
            is_valid: true,
            text: ''
        },
        city: {
            is_valid: true,
            text: ''
        },
        state: {
            is_valid: true,
            text: ''
        },
        zip: {
            is_valid: true,
            text: ''
        }
    });
},
```

该方法所做的事情就是将一个位置对象推送到 `locations` 字段，其中包含名称、地址、城市、省份和邮编以及有效的冲泡方法数组，然后将位置对象中的某些字段验证规则推送到 `validations.locations` 字段，我们在验证规则中去掉了 `name` 和 `methodsAvailable` 属性，这是因为对 `name` 字段而言，如果有空的话，我们将使用咖啡店已经存在的名称字段，并且这个字段也不是必需的；而对 `methodsAvailable` 字段而言，当添加咖啡店时，你可能还不知道所有的冲泡方法。

这样，通过动态绑定，就可以在调用该方法时在表单中插入一个咖啡店位置写区块了，我们在组件创建时调用上述方法添加位置区块：

```js
created(){
    this.addLocation();
},
```

这将会初始化我们的第一个位置（提交表单至少有一个咖啡店的位置，可以将这个位置作为总店的位置，其他新增的位置作为分店位置）。

## Step 3：添加填充表单模板

在这一步中，我们需要为所有输入字段定义一个可视化的显示模板，首先，我们将原来模板中的地址、城市、省份和邮编字段都删除，因为这些字段已经并入到位置模块里面，并且新增一些字段：

```html
<div class="page">
    <form>
        <div class="grid-container">
            <div class="grid-x grid-padding-x">
                <div class="large-12 medium-12 small-12 cell">
                    <label>名称
                        <input type="text" placeholder="咖啡店名" v-model="name">
                    </label>
                    <span class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</span>
                </div>
                <div class="large-12 medium-12 small-12 cell">
                    <label>网址
                        <input type="text" placeholder="网址" v-model="website">
                    </label>
                    <span class="validation" v-show="!validations.website.is_valid">{{ validations.website.text }}</span>
                </div>
                <div class="large-12 medium-12 small-12 cell">
                    <label>简介
                        <input type="text" placeholder="简介" v-model="description">
                    </label>
                </div>
            </div>
            <div class="grid-x grid-padding-x" v-for="(location, key) in locations">
                <div class="large-12 medium-12 small-12 cell">
                    <h3>位置</h3>
                </div>
                <div class="large-6 medium-6 small-12 cell">
                    <label>位置名称
                        <input type="text" placeholder="位置名称" v-model="locations[key].name">
                    </label>
                </div>
                <div class="large-6 medium-6 small-12 cell">
                    <label>详细地址
                        <input type="text" placeholder="详细地址" v-model="locations[key].address">
                    </label>
                    <span class="validation" v-show="!validations.locations[key].address.is_valid">{{ validations.locations[key].address.text }}</span>
                </div>
                <div class="large-6 medium-6 small-12 cell">
                    <label>城市
                        <input type="text" placeholder="城市" v-model="locations[key].city">
                    </label>
                    <span class="validation" v-show="!validations.locations[key].city.is_valid">{{ validations.locations[key].city.text }}</span>
                </div>
                <div class="large-6 medium-6 small-12 cell">
                    <label>省份
                        <input type="text" placeholder="省份" v-model="locations[key].state">
                    </label>
                    <span class="validation" v-show="!validations.locations[key].state.is_valid">{{ validations.locations[key].state.text }}</span>
                </div>
                <div class="large-6 medium-6 small-12 cell">
                    <label>邮编
                        <input type="text" placeholder="邮编" v-model="locations[key].zip">
                    </label>
                    <span class="validation" v-show="!validations.locations[key].zip.is_valid">{{ validations.locations[key].zip.text }}</span>
                </div>
                <div class="large-12 medium-12 small-12 cell">
                    <label>支持的冲泡方法</label>
                    <span class="brew-method" v-for="brewMethod in brewMethods">
                        <input v-bind:id="'brew-method-'+brewMethod.id+'-'+key" type="checkbox"
                               v-bind:value="brewMethod.id"
                               v-model="locations[key].methodsAvailable">
                        <label v-bind:for="'brew-method-'+brewMethod.id+'-'+key">{{ brewMethod.method }}</label>
                    </span>
                </div>
                <div class="large-12 medium-12 small-12 cell">
                    <a class="button" v-on:click="removeLocation(key)">移除位置</a>
                </div>
            </div>
            <div class="grid-x grid-padding-x">
                <div class="large-12 medium-12 small-12 cell">
                    <a class="button" v-on:click="addLocation()">新增位置</a>
                </div>
                <div class="large-12 medium-12 small-12 cell">
                    <a class="button" v-on:click="submitNewCafe()">提交表单</a>
                </div>
            </div>
        </div>
    </form>
</div>
```

这里我们所做的就是将模板中原来的那个只能设置单个位置信息的表单替换成一个可以动态新增/移除位置字段的表单。

首先我们来看下这段代码：

```html
<div class="grid-x grid-padding-x" v-for="(location, key) in locations">
```

它会遍历 `locations` 数组中的所有位置信息并解析 `location` 和 `key` 字段，分别表示位置数据和位置索引。我们会使用 `key` 来实现每个表单输入字段于数据模型的双向绑定：

```html
<div class="large-6 medium-6 small-12 cell">
     <label>位置名称
         <input type="text" placeholder="位置名称" v-model="locations[key].name">
     </label>
</div>
```

`locations[key].name` 通过 `key` 引用了位置对象 `locations` 对应索引中的 `name` 属性值。所有其他位置字段的关联逻辑与此一致，不再赘述。此外，我们还通过相应的字段验证规则来决定是否显示对应字段验证错误信息：

```js
<span class="validation" v-show="!validations.locations[key].address.is_valid">{{ validations.locations[key].address.text }}</span>
```

在设置完咖啡店位置信息后，我们还渲染了支持的冲泡方法选择列表：

```js
<div class="large-12 medium-12 small-12 cell">
    <label>支持的冲泡方法</label>
    <span class="brew-method" v-for="brewMethod in brewMethods">
        <input v-bind:id="'brew-method-'+brewMethod.id+'-'+key" type="checkbox" v-bind:value="brewMethod.id" v-model="locations[key].methodsAvailable">
        <label v-bind:for="'brew-method-'+brewMethod.id+'-'+key">{{ brewMethod.method }}</label>
    </span>
</div>
```

这里我们为某个分店支持的冲泡方法提供了选择列表：我们通过 `v-model` 将其和 `locations[key].methodsAvailable` 进行绑定，并通过遍历 `brewMethods` （查询冲泡方法 API 获取）动态设置每个复选框的 `id` 和 `value` 属性值。

最后，添加一个移除按钮来移除与之关联的位置信息：

```js
<div class="large-12 medium-12 small-12 cell">
    <a class="button" v-on:click="removeLocation(key)">移除位置</a>
</div>
```

如果你一不小心添加了太多的位置信息，可以通过这个按钮逐个移除。点击该按钮会调用 `removeLocation` 方法并将位置索引 `key` 作为参数传入，然后通过 `splice` 从数组中删除指定 `key` 对应的位置数据和验证规则。需要将这个方法添加到 `methods` 对象中：

```js
removeLocation(key) {
    this.locations.splice(key, 1);
    this.validations.locations.splice(key, 1);
},
```

在循环体之外，还定义了一个新增按钮来新增位置区块：

```js
<div class="large-12 medium-12 small-12 cell">
    <a class="button" v-on:click="addLocation()">新增位置</a>
</div>
```

点击该按钮会调用 `addLocation` 方法在表单中插入位置区块。

## Step 4：在表单中引入冲泡方法数据

我们在上一步中已经遍历过 `brewMethods` 数组，该数组代表所有支持的冲泡方法数据，需要从[上一篇教程](https://laravelacademy.org/post/9625.html#toc_5)定义的 Vuex 存储中获取，我们已经在 `Layout.vue` 中加载这个数据了，所以可以直接拿来使用，只需将其添加到计算属性中即可：

```js
computed: {
    brewMethods() {
        return this.$store.getters.getBrewMethods;
    }
},
```

### 第五步：多对多关联查询

定义好模型类之间的关联关系后，就可以在查询的时候使用关联查询了，有关关联查询的使用方法，可以参考[官方文档](https://laravelacademy.org/post/8867.html#toc_9)，我们将改写控制器 `app/Http/Controllers/API/CafesController.php` 中咖啡店的获取逻辑为关联查询，编辑 `getCafes()` 方法如下：

```
public function getCafes()
{
    $cafes = Cafe::with('brewMethods')->get();
    return response()->json( $cafes );
}
```

编辑 `getCafe()` 方法如下：

```
public function getCafe($id)
{
    $cafe = Cafe::where('id', '=', $id)->with('brewMethods')->first();
    return response()->json( $cafe );
}
```

我们使用 `with` 方法，将模型类中的关联关系方法名作为参数传入，这样对应的关联数据会以属性的方式出现在查询结果中，属性名就是 `with` 方法传入的字符串参数。

我们可以在 `routes/web.php` 中定义一个测试路由对上面改写的 `getCafe` 方法进行测试：

```
Route::get('/cafe/{id}', 'API\CafesController@getCafe');
```

在浏览器中访问 `http://roast.test/cafe/3`，返回的结果如下：

![img](https://static.laravelacademy.org/wp-content/uploads/2018/10/f02176608f53f7726d0695769ce3e48e.jpg)

> 注：如果 `cafes_brew_methods` 数据表中没有数据，可以插入一些测试数据。

