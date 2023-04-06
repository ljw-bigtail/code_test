const fs = require("fs");
const xlsx = require("node-xlsx");

const file = xlsx.parse("./searchedProducts[100mph.cc]-2023_4_4_23_01_49.csv");
const arr = file[0].data;
// console.log(arr[0]);

const _arr = arr.filter((e) => {
  const [
    Handle,
    Title,
    BodyHTML,
    Vendor,
    Type,
    Tags,
    Published,
    Option1Name,
    Option1Value,
    Option2Name,
    Option2Value,
    Option3Name,
    Option3Value,
    VariantSKU,
    VariantGrams,
    VariantInventoryTracker,
    VariantInventoryQty,
    VariantInventoryPolicy,
    VariantFulfillmentService,
    VariantPrice,
    VariantCompareAtPrice,
    VariantRequiresShipping,
    VariantTaxable,
    VariantBarcode,
    ImageSrc,
    ImagePosition,
    ImageAltText,
    GiftCard,
    VariantImage,
    VariantWeightUnit,
    VariantTaxCode,
    Costperitem,
  ] = e;
  if (Tags) {
    if (
      Tags.toLocaleLowerCase().indexOf("motorcycle") > -1 &&
      Type.toLocaleLowerCase() === "t-shirt"
    ) {
      return true;
    }
  }
  return false;
});

const names = _arr.map(e=>e[0])

const end_arr = arr.filter((e,i)=>{
  return names.includes(e[0])
}).map((e, i)=>{
  // if(e[2] && e[2].indexOf('100mph') > -1){
  //   console.log(e[2].replace(/Â/g, '').replace(/<a[\s\S]*>/g, '').replace(/<\/a>/g, ''));
  // }
  e[2] = e[2] && e[2].replace(/Â/g, '').replace(/<a[\s\S]*>/g, '').replace(/<\/a>/g, '')
  e[3] = ''
  e[5] = e[5] && e[5].split(',').filter(e=>e!='100MPH').join(',')
  // DP04041000_color_size
  e[13] = `DP0404${(1001 + i).toString()}_${(e[8]||'').replace(/\s/g, '')}_${(e[10]||'').replace(/\s/g, '')}`
  e[16] = '500'
  e[19] = '21.99'
  return e
})

// console.log(names.join('\n'));
// console.log(end_arr.length);


function noRepeat(arr) {
  return [...new Set(arr)];
}
// console.log(names.length, noRepeat(names).length);


const end_data = [
  //    每一个对象就是一个表格页
  {
    //    name 属性就是表格页的名称
    name: '表1',
    //    data 就是表格页内的数据
    data: [
      arr[0],
      ...end_arr
    ]
  }
]

// 利用 xlsx 生成表格流文件
const workboot = xlsx.build(end_data)

// 把生成好的内容写入一个文件
fs.writeFileSync('./out/product.xlsx', workboot) 