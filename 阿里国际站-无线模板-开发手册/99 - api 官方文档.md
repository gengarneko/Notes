#### API使用说明

```
API使用涉及到一些商家基础数据，通过一些列表对应的方式获取
bizId:当前旺铺的所对应供应商（卖家）ID，在PC模块的写入通过 "gdc.bizId"，在无线模块的获取通过"$bizId"
```

#### 公共基础

```
API接口：icbu.data.common.minisite
说明：旺铺域名和URL数据
入参：
  bizId
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": {
          "paths": {
              "homeUrl": "/",
              "contactsUrl": "/contactinfo.html",
              "companyProfileUrl": "/company_profile.html",
              "productsUrl": "/productlist.html"
          },
          "domain": "aliqatest01.en.alibaba.com"
      }
  }
API接口：icbu.data.common.minisite.paths
说明：旺铺URL数据
入参：
  bizId
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": {
          "homeUrl": "/",
          "contactsUrl": "/contactinfo.html",
          "companyProfileUrl": "/company_profile.html",
          "productsUrl": "/productlist.html"
      }
  }
API接口：icbu.data.common.minisite.domain
说明：旺铺域名
入参：
  bizId
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": "aliqatest01.en.alibaba.com"
  }
API接口：icbu.data.common.multilang.minisite
说明：多语言旺铺地址
入参：
  bizId
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": [{
          "nation": "german",
          "display": "Deutsch",
          "index": 1,
          "url": "//german.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "portuguese",
          "display": "Português",
          "index": 2,
          "url": "//portuguese.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "spanish",
          "display": "Español",
          "index": 3,
          "url": "//spanish.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "french",
          "display": "Français",
          "index": 4,
          "url": "//french.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "italian",
          "display": "Italiano",
          "index": 5,
          "url": "//italian.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "russian",
          "display": "Pусский",
          "index": 6,
          "url": "//russian.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "korean",
          "display": "한국어",
          "index": 7,
          "url": "//korean.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "japanese",
          "display": "日本語",
          "index": 8,
          "url": "//japanese.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "arabic",
          "display": "اللغة العربية",
          "index": 9,
          "url": "//arabic.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "thai",
          "display": "ภาษาไทย",
          "index": 10,
          "url": "//thai.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "vietnamese",
          "display": "tiếng Việt",
          "index": 11,
          "url": "//vietnamese.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "turkish",
          "display": "Türk",
          "index": 12,
          "url": "//turkish.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "dutch",
          "display": "Nederlands",
          "index": 13,
          "url": "//dutch.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "indonesian",
          "display": "Indonesian",
          "index": 14,
          "url": "//indonesian.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "hebrew",
          "display": "עברית",
          "index": 15,
          "url": "//hebrew.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        },
        {
          "nation": "hindi",
          "display": "हिंदी",
          "index": 16,
          "url": "//hindi.alibaba.com/supplier_wc4BAALsPWvycX2c0AQnqlVv7tlm"
        }
      ]
  }
```

#### 商品

```
API接口：icbu.data.product.groups
说明：产品分组（最多三级）
入参数：
  bizId
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": [{
            "groupName": "Hot Sale product",
            "groupId": 802597758,
            "url": "/productgrouplist-802597758/Hot_Sale_product.html"
        }, {
            "groupName": "Tempered Glass Screen Protector",
            "groupId": 218105385,
            "url": "/productgrouplist-218105385/Tempered_Glass_Screen_Protector.html",
            "children": [{
                "groupName": "For iPhone",
                "groupId": 801248223,
                "url": "/productgrouplist-801248223/For_iPhone.html"
            }]
        }]
  }
API接口：icbu.data.product.item
说明：商品单品信息
入参数：
  bizId,productId
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": {
          "productCurrentGroupId":805608545,
          "productIsMarketGoods":false,
          "productImage":{
                "exist":true,
                "url":{
                    "big":"//sc01.alicdn.com/kf/HTB1hU9ng0rJ8KJjSspa760uKpXaw/alisuppliers-ceshi-product1.png",
                    "normal":"//sc01.alicdn.com/kf/HTB1hU9ng0rJ8KJjSspa760uKpXaw/alisuppliers-ceshi-product1.png_120x120.png",
                    "small":"//sc01.alicdn.com/kf/HTB1hU9ng0rJ8KJjSspa760uKpXaw/alisuppliers-ceshi-product1.png_350x350.png",
                    "thumb":"//sc01.alicdn.com/kf/HTB1hU9ng0rJ8KJjSspa760uKpXaw/alisuppliers-ceshi-product1.png_50x50.png"
                },
                "urls":[
                    {
                        "big":"//sc01.alicdn.com/kf/HTB1hU9ng0rJ8KJjSspa760uKpXaw/alisuppliers-ceshi-product1.png",
                        "normal":"//sc01.alicdn.com/kf/HTB1hU9ng0rJ8KJjSspa760uKpXaw/alisuppliers-ceshi-product1.png_120x120.png",
                        "small":"//sc01.alicdn.com/kf/HTB1hU9ng0rJ8KJjSspa760uKpXaw/alisuppliers-ceshi-product1.png_350x350.png",
                        "thumb":"//sc01.alicdn.com/kf/HTB1hU9ng0rJ8KJjSspa760uKpXaw/alisuppliers-ceshi-product1.png_50x50.png"
                    }
                ]
            },
            "productId":60720496922,
            "productMinOrderUnit":100,
            "productMinOrderUnitName":Piece,
            "productFobPrice":"US$ 1.50 ~ 2.00 / Piece",
            "productUrl":"/product/60720496922-805608545/alisuppliers_ceshi_product1.html",
            "productSubject":"alisuppliers ceshi product1"
      }
  }
API接口：icbu.data.product.grouplist
说明：商品分组列表信息
入参数：
  bizId,strategyName,selectGroups,selectGroupProducts,groupCount,startIndex,countNumber
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": [
        {
          "groupName": "Air Cooler",
          "groupId": 801313964,
          "url": "/productgrouplist-801313964/Air_Cooler.html",
          "products": [
            {
              "productImage": {
                "exist": true,
                "url": {
                  "x120": "//sc01.alicdn.com/kf/HTB1jX6bJVXXXXaiXXXXq6xXFXXXw/DL-hot-sale-air-cooler-rechargeable-air.jpg_120x120.jpg",
                  "x350": "//sc01.alicdn.com/kf/HTB1jX6bJVXXXXaiXXXXq6xXFXXXw/DL-hot-sale-air-cooler-rechargeable-air.jpg_350x350.jpg",
                  "original": "//sc01.alicdn.com/kf/HTB1jX6bJVXXXXaiXXXXq6xXFXXXw/DL-hot-sale-air-cooler-rechargeable-air.jpg",
                  "x960": "//sc01.alicdn.com/kf/HTB1jX6bJVXXXXaiXXXXq6xXFXXXw/DL-hot-sale-air-cooler-rechargeable-air.jpg_960x960.jpg",
                  "x640": "//sc01.alicdn.com/kf/HTB1jX6bJVXXXXaiXXXXq6xXFXXXw/DL-hot-sale-air-cooler-rechargeable-air.jpg_640x640.jpg",
                  "x220": "//sc01.alicdn.com/kf/HTB1jX6bJVXXXXaiXXXXq6xXFXXXw/DL-hot-sale-air-cooler-rechargeable-air.jpg_220x220.jpg"
                }
              },
              "fobPrice": "US $0.49 - 0.8 / Piece",
              "productId": 60365560839,
              "fobPriceWithoutUnit": "US $0.49 - 0.8",
              "minOrderQuantity": "500",
              "productUrl": "/product/60365560839-801313964/DL_hot_sale_air_cooler_rechargeable_air_booler_mini_portable_air_cooler_evaporative_air_cooler.html",
              "minOrderType": "Pieces",
              "productSubject": "DL hot sale air cooler rechargeable air booler mini portable air cooler evaporative air cooler",
              "moq": "500 Pieces",
              "fobUnit": "Piece"
            }
          ]
        }
      ]
  }
入参说明：
  strategyName表示获取接口数据策略，可选值包括groupRange、groupSelect、groupProductSelect，分别表示选取从第几到第几个分组的商品数据、选取指定几个分组的商品数据、选取指定几个分组同时指定分组下商品的数据，默认为groupRange。
  countNumber表示每个分组获取几个产品，默认值10，最大值30。groupCount默认为3，最大为8。
  在groupRange策略下，传入参数groupCount表示选择几个产品分组，startIndex表示从第几个分组开始取（从0开始，按商品后台分组顺序，默认值为0）。
  在groupSelect策略下，传入参数selectGroups表示选择的分组列表，可在Array组件下嵌套分组选择组件来构造入参。
  在groupProductSelect策略下，传入参数selectGroupProducts表示选择的分组和商品列表，可在Array组件下嵌套商品选择组件构造入参（注意在表单编辑器中要将商品选择组件的参oneGroup项目勾选上）。
API接口：icbu.data.product.list
说明：商品列表信息
入参数：
  bizId,strategyName,countNumber,products,group
入参说明：
  没有除bizId外参数，未配置展示策略的默认strategyName=modifyTimeDesc，未配置商品个数的默认countNumber=6
  strategyName为展示策略，可选值有modifyTimeDesc、companyHot、showcase、manuallySelect，分别代表最新发布、最热门、橱窗商品、手动选择（不推荐使用手动策略，尤其是不适合作为默认策略，当用户下架选择的商品时，前台展示的商品个数可能会少于预期）
  countNumber为展示个数，限1-60的整数，推荐20个以内以保证性能最佳，非法值将被重置为默认值6个，因供应商商品数据本身问题可能返回少于该数量的商品
  products当且仅当strategyName=manuallySelect时，才需要传递该参数，配合商品选择组件使用，对应选品组件的dataName名称（默认products，可自定义）的对象，入参如例products:mds.products
  group当strategyName=modifyTimeDesc时可传入，格式如例：987654321，表示最新发布策略筛选商品时仅筛选该产品分组下的商品，需要配置产品分组(也可能在部分场景中称为“产品类目”)选择组件使用（暂不支持，后续可能变动）
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": [{
        "productImage": {
          "exist": true,
          "url": {
            "x120": "//sc02.alicdn.com/kf/HTB1k8pMmcrI8KJjy0Fhq6zfnpXaW/High-quality-4gb-8gb-underwater-swimming-MP3.jpg_120x120.jpg",
            "x220": "//sc02.alicdn.com/kf/HTB1k8pMmcrI8KJjy0Fhq6zfnpXaW/High-quality-4gb-8gb-underwater-swimming-MP3.jpg_220x220.jpg",
            "x350": "//sc02.alicdn.com/kf/HTB1k8pMmcrI8KJjy0Fhq6zfnpXaW/High-quality-4gb-8gb-underwater-swimming-MP3.jpg_350x350.jpg",
            "x640": "//sc02.alicdn.com/kf/HTB1k8pMmcrI8KJjy0Fhq6zfnpXaW/High-quality-4gb-8gb-underwater-swimming-MP3.jpg_640x640.jpg",
            "x960": "//sc02.alicdn.com/kf/HTB1k8pMmcrI8KJjy0Fhq6zfnpXaW/High-quality-4gb-8gb-underwater-swimming-MP3.jpg_960x960.jpg",
            "original": "//sc02.alicdn.com/kf/HTB1k8pMmcrI8KJjy0Fhq6zfnpXaW/High-quality-4gb-8gb-underwater-swimming-MP3.jpg"
          }
        },
        "fobPrice": "US $80.0 - 90.0 / Acres",
        "productId": 60730989725,
        "fobPriceWithoutUnit": "US $80.0 - 90.0",
        "minOrderQuantity": "90",
        "productUrl": "/product/60730989725-806037357/High_quality_4gb_8gb_underwater_swimming_MP3_player_Waterproof_mp3.html",
        "minOrderType": "Acres",
        "productSubject": "High quality 4gb 8gb underwater swimming MP3 player Waterproof mp3",
        "moq": "90 Acres",
        "fobUnit": "Acres"
      }]
  }
出参说明：
  商品图片建议使用x120、x220、x350，original为用户上传原始尺寸可能造成图片尺寸过大导致页面加载缓慢，x640、x960一般用户可能没有这么大的尺寸，谨慎使用。如果所选尺寸大于原始尺寸，则实际返回原始尺寸。
  FOB价格、MOQ最小起订量相关数据均可能存在空的可能性，请注意兼容null、""或者没有对应key的情形。
```

#### 交易

```
API接口：icbu.data.trade.assurance
说明：信用保障信息
入参数：
  bizId
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": {
          "baoAccountAmount": ,":"50,000",
          "baoAccountCreditLevel":1,
      }
  }
```

#### 认证

```
API接口：icbu.data.auth.types
说明：公司企业信息
入参：
  bizId
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": {
          "companyHasPassAV": false,
          "companyHasPassOnsite": true,
          "companyHasPassAssessment": true,
          "companyHasPassMainProduct": true
      }
  }
```

#### 会员

```
API接口：icbu.data.member.account
说明：单个账号信息
入参：
  bizId,loginId
出参：
  {
      "success": "true/false",
      "error": {
          "code": 50001,
          "message": "Parameter is invalid."
      },
      "result": {
          "accountDisplayName":"Ms. Liu",
          "accountJobTitle":"Sales Manager"
      }
  }
```

© 1999-2018 Alibaba.com. All rights reserved.