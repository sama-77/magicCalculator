

let displayInput=document.getElementById("display");
let calcButtons=document.querySelectorAll("button");
let mouseIcon=document.querySelector(".mouse-icon");
let regex= /[^0-9+\-*/.]/g ;
let specialButton=document.getElementById("equal");
let realTimeResult = document.getElementById("result");

//keyboard support
displayInput.addEventListener("input", function () {
displayInput.value = displayInput.value.replace(regex, "");
getrealTimeResult();

  
});

//realtimeresult
function getrealTimeResult()
{
    let result="";
    if (displayInput.value.trim() !== "") {
       result = calcExpression(displayInput.value);
      if (isNaN(result))
      {
        result=" "
      }
  }
  realTimeResult.innerHTML=result;

}

//handle buttons
for (let button of calcButtons)
{
    button.addEventListener('mousemove',function(){
        button.style.background="hsla(268, 45%, 40%, 0.886)";
    })
    button.addEventListener('mouseout',function(){
        button.style.background="#341c4f";
    })
    button.addEventListener('click', function(){
    if (button.value=='reset')
    {
        displayInput.value="";
        getrealTimeResultrealTimeResult();
    }
    else if (button.value =='=')
    {
        displayInput.value=calcExpression(displayInput.value);
        getrealTimeResult();
    }
    else if(button.value=='delete')
    {
        displayInput.value=deleteChar(displayInput.value)
        getrealTimeResult();
    }
    else
    {
        displayInput.value+=button.value;
        getrealTimeResult();
    }

    })
    
}

//calc
function calcExpression(expression)
{
    let number=[];
    let operator=[];
    let currentNumber="";
    for(let i=0 ;i<expression.length;i++)
    {
        if('.0123456789'.includes(expression[i]))
        {
            currentNumber+=expression[i];
        }
        else if('+-*/'.includes(expression[i]))
        {
            operator.push(expression[i]);
            number.push(parseFloat(currentNumber));
            currentNumber='';
        }
    }
    number.push(parseFloat(currentNumber)) //add last number

    for(let i=0 ;i<operator.length;i++)
    {
        
        if(operator[i]=='*' || operator[i]=='/')
        {
              const priorityResult=operator[i]=='*'?
              number[i]*number[i+1]:
              number[i]/number[i+1];
              operator.splice(i,1);
              number.splice(i,2,priorityResult);
              i--;

        }
    }

    finalResult=number[0];
    for(let i=0 ;i <operator.length;i++)
    {
        operator[i]=='+'?
        finalResult+=number[i+1]:
        finalResult-=number[i+1];
    }
    return finalResult;
}
//delete 
function deleteChar(expression)
{
    return expression.slice(0, -1)
}

//mouse icon
document.addEventListener('mousemove',function(e)
{
    
    mouseIcon.style.top=e.clientY+ window.scrollY +"px";
    mouseIcon.style.left=e.clientX+ window.scrollX +"px";
    
})


