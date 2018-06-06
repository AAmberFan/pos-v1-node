$(document).ready(function () {
    let selectItem = [];
    let barcode;
    let recipt='';
    $("#submit").click(function () {
        // let inputs = Array.from($("input:text"));
        let inputs = $("input:text");

        for(let i = 0; i< inputs.length;i++){
            if(inputs.eq(i).val()==''){
                alert("Cannot be invalid!");
                inputs.eq(i).val("0");
                selectItem = [];
            }
            if(inputs.eq(i).val()!="0") {
                //console.log(inputs.eq(i).siblings(".barcode").text());
                barcode = inputs.eq(i).siblings(".barcode").text();
                if(inputs.eq(i).val()!=="1"){
                    barcode=barcode.concat('-',inputs.eq(i).val());

                }
                selectItem.push(barcode.split(":")[1]);
            }
        }
        recipt = main(selectItem);
        $("#Summery").html(recipt);
        selectItem=[];
        });

    });

