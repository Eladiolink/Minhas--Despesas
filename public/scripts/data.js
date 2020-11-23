dates=document.querySelectorAll(".data")
console.log(dates)
console.log(dates[0].innerHTML)

for(let i=0;i<dates.length;i++){
    date=dates[i].innerHTML.split('-');
    str=reverteStrDate(date);
    datefinal=str[0]+"/"+str[1]+"/"+str[2];

    dates[i].innerHTML=datefinal;
}

function reverteStrDate(array){
    endValue=array[2];
    startVlaue=array[0];

    array[0]=endValue;
    array[2]=startVlaue;

    return array;
}


