# 通过 Vue Mixins 在前端首页对咖啡店进行过滤筛选

随着咖啡店的增多，需要按照指定条件对咖啡店进行过滤筛选，才能找到心仪的咖啡店。由于我们现在在应用首页已经将所有咖啡店数据一次性返回了，所以现在我们在前端基于 Vue 对咖啡店进行过滤，当然，随着数据的进一步增大，筛选过滤功能必须集合后端 API 实现，但是对于目前数据量来说，前端处理就可以了。

我们将基于以下几个纬度对数据进行过滤：

- 文本搜索
- 标签选择
- 是否是烘焙店
- 冲泡方法

我们将使用 [Vue Mixins](https://cn.vuejs.org/v2/guide/mixins.html) 技术在前端对咖啡店数据进行过滤。

下面我们将依次为上面每个筛选纬度创建过滤处理函数并将其各自放置在单独的 JavaScript 文件中。

## Step 1：文本过滤处理函数

- 创建子目录 `filter` 和文件 `cafeTextFilter.js` 存放文本筛选函数：

  `resources/assets/js/mixins/filter/cafeTextFilter.js`  

- 筛选的文本字段包括：
  - 咖啡店名称
  - 位置名称
  - 地址
  - 城市及省份
- 如果以上任意字段包含筛选文本，则显示咖啡店列表到筛选结果中，否则显示为空
- 如果文本筛选为空，则显示所有咖啡店

```js
export const CafeTextFilter = {
  methods: {
    processCafeTextFilter(cafe, text) {
      // 筛选文本不为空时才会处理
      if (text.length > 0) {
        // 如果咖啡店名称、位置、地址或城市与筛选文本匹配，则返回 true，否则返回 false
        if (cafe.name.toLowerCase().match('[^,]*' + text.toLowerCase() + '[,$]*')
        		|| cafe.location_name.toLowerCase().match('[^,]*' + text.toLowerCase() + '[,$]*')
        		|| cafe.address.toLowerCase().match('[^,]*' + text.toLowerCase() + '[,$]*')
        		|| cafe.city.toLowerCase().match('[^,]*' + text.toLowerCase() + '[,$]*')
        ) {
          return true;
        } else {
          retrun false;
        }
      } else {
        return true;
      }
    }
  }
};
```

## Step 2：标签过滤处理函数

接下来在 `resources/assets/js/mixins/filters` 目录下创建 `CafeTagsFilter.js`，编写标签过滤处理函数，如果咖啡店任意标签包含筛选标签则显示该咖啡店：

```js
export const CafeTagsFilter = {
    methods: {
        processCafeTagsFilter(cafe, tags) {
            // 如果标签不为空则进行处理
            if (tags.length > 0) {
                var cafeTags = [];

                // 将咖啡店所有标签推送到 cafeTags 数组中
                for (var i = 0; i < cafe.tags.length; i++) {
                    cafeTags.push(cafe.tags[i].tag);
                }

                // 遍历所有待处理标签，如果标签在 cafeTags 数组中返回 true
                for (var i = 0; i < tags.length; i++) {
                    if (cafeTags.indexOf(tags[i]) > -1) {
                        return true;
                    }
                }

                // 如果所有待处理标签都不在 cafeTags 数组中则返回 false
                return false;
            } else {
                return true;
            }
        }
    }
};
```