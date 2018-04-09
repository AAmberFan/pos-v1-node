const printInvertory = require("./datbase.js");

function main(input) {//['ITEM000001','ITEM000001','ITEM000001','ITEM000001','ITEM000001','ITEM000003-2','ITEM000005','ITEM000005','ITEM000005']
    let allItems = printInvertory.loadAllItems();

    let allPro = printInvertory.loadPromotions();
    //console.log(allPro[0]);
    let selectedItem = pickItems(input,allItems, allPro);
    let price = calculatePrice(selectedItem);
    return 'Hello World!';
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
                if((allPro[0].barcodes).includes(j.barcode.trim())){
                    items.promotion = allPro[0].type;
                }else{
                    items.promotion = null;
                }
                console.log(items);
                allSelectedItem.push(items);
            }
        }

    }

    return store;
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
    let recipt = '***<没钱赚商店>购物清单***\n';
    let priceWithoutPro = 0;
    let priceWithPro = 0;
    let save = 0;
    let proNum;// the number of promotion
    for(let item of selectedItem){
        priceWithoutPro += (item.price * item.number).toFixed(2);
        proNum = Math.floor(item.number/3);
        priceWithPro += (item.price * (item.number-proNum)).toFixed(2);
        recipt +=
    }
}
main(['ITEM000001','ITEM000001','ITEM000001','ITEM000001','ITEM000001','ITEM000003-2','ITEM000005','ITEM000005','ITEM000005']);
module.exports = main;