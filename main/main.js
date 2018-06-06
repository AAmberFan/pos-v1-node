// const printInvertory = require("./datbase.js");

function main(input) {//['ITEM000001','ITEM000001','ITEM000001','ITEM000001','ITEM000001','ITEM000003-2','ITEM000005','ITEM000005','ITEM000005']
    console.log(input);
    let allItems = loadAllItems();
    let allPro = loadPromotions();
    let selectedItem = pickItems(input,allItems, allPro);
    //console.log(selectedItem);
    let result = calculatePrice(selectedItem);
    console.log(result);
    return result;
}

function pickItems(input,allItems, allPro){
    let allSelectedItem = [];
    let items = {};
    let store = dealWithBarCode(input);
    for(let i in store){
        for(let j of allItems){
            if((j.barcode.trim()) ==(i.trim())){
                items = j;
                items.number = store[i];
                items.price = items.price.toFixed(2);
                if((allPro[0].barcodes).includes(j.barcode.trim())){
                    items.promotion = allPro[0].type;
                }else{
                    items.promotion = null;
                }
                allSelectedItem.push(items);
            }
        }

    }

    return allSelectedItem;
}
function dealWithBarCode(input){
    let store = {};
    let codeNum = [];
    for(let i of input) {
        codeNum = i.split("-");

        if (codeNum.length < 2) {

            if (store[i] == null) {
                store[i] = 1;
            } else {
                store[i] += 1;
            }
        }else{
            if (store[codeNum[0]] == null) {
                store[codeNum[0]] = parseInt(codeNum[1]);
            } else {
                store[codeNum[0]] += parseInt(codeNum[1]);
            }
        }
    }
    return store;
}
function calculatePrice(selectedItem){
    let recipt = '***<没钱赚商店>购物清单***\n<br />';
    let priceWithoutPro = 0;
    let priceWithPro = 0;
    let save = 0;
    let proNum;// the number of promotion
    for(let item of selectedItem){
        priceWithoutPro += item.price * item.number;
        proNum = Math.floor(item.number/3);
        if(item.promotion==='BUY_TWO_GET_ONE_FREE'){
            priceWithPro += item.price * (item.number-proNum);
            //console.log(priceWithPro);
        }
        else{
            priceWithPro += item.price * item.number;
        }
        recipt += `名称：${item.name}，数量：${item.number}${item.unit}，单价：${item.price}(元)，小计：${(item.price * (item.number-proNum)).toFixed(2)}(元)`;
        recipt += '\n<br />';

    }
    recipt+='----------------------\n<br />';
    recipt +='挥泪赠送商品：\n<br />' ;
    for(let item of selectedItem){
        proNum = Math.floor(item.number/3);
        if(item.promotion==='BUY_TWO_GET_ONE_FREE'){
            recipt+=`名称：${item.name}，数量：${proNum}${item.unit}<br/>`;
        }
    }
    recipt+='----------------------\n<br />';
    recipt+= `总计：${priceWithPro.toFixed(2)}(元)\n` +
        `节省：${(priceWithoutPro-priceWithPro).toFixed(2)}(元)<br />` +
        '**********************';
    return recipt;
   // console.log(recipt);
}
//main(['ITEM000001','ITEM000001','ITEM000001','ITEM000001','ITEM000001','ITEM000003-2','ITEM000005','ITEM000005','ITEM000005']);
// module.exports = main;