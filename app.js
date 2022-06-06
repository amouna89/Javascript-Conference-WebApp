document.addEventListener("DOMContentLoaded",()=>{

    const form =document.querySelector("form");
    const input = form.querySelector("input");
    const btnSubmit = document.querySelector("button");
    const list = document.getElementById("invitedList");
    const btnRemove=document.getElementsByTagName("button");

    //the checkboxto filter the confirmed guests 
    const checkBoxConfirmed = document.getElementById("confirmed");

    //create an object with a property and assign the value parameter to the propertry 
    function createElement (elementName,property,value){
        const element = document.createElement(elementName);
        element[property] = value;
        return element;

    }
    function appenToLI(li,elementName,property,value){

        const element = createElement(elementName,property,value);
        //append label to li
        li.appendChild(element);
        return element;



    }

    /*FUNCTIONS*/
    //a fucntion to create a list Item LI a Label and a checkbox
    function CreateListItem (){
        //create an li
        const li = document.createElement("li");
        
       //fonction create span prend an li, input ,create a span and append it to it 
            CreateSpan (li,input);
        
        // //create a label and append it to li 
         const label = appenToLI(li,"label","textContent","confirmed");
       
        //create a checkbox it is an input field with checkbox type 
        const checkbox = createElement("input","type","checkbox");
        //append checkbox to label
        label.appendChild(checkbox);

        //create an Edit button and appende it to the li 
        btnEditFN(li);
        //create a remove button and append it to the li 
        btnRemoveFN(li);

        //append li to the list item
        list.appendChild(li);


        
    }

//the function checkinputValue(input) will take an input as a parameter and returns true or flase 

    function checkinputValue(input){
         
            const value = input.value;
            const ABC =[" ","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
            const array =[];
            const resultArray = [];
            
            for(let i=0; i< value.length;i++){
            array[i]=value.charAt(i)
        
            }
            for(let i=0; i< value.length;i++){
                const text = array[i].toLowerCase();
                const result = ABC.includes(text);
                resultArray[i]= result;
                // console.log(resultArray[i]);
                
            }
   
            const isString = resultArray.includes(false);   
            console.log(isString);
            return isString;

    }

      


  

    //The fucntion btnRemoveFN  will create a remove BUTTON
    function btnRemoveFN (li){
        const btnRemove = appenToLI(li,"button","textContent","Remove");
    }

    //The fucntion btnEditFN will create an EDIT BUTTON
    function btnEditFN(li){
        const btnRemove = appenToLI(li,"button","textContent","Edit");

    }

    function CreateInput(li,span) {

            //create a an input type text
            const input = createElement("input","type","text");
            //assign the text node value to the input
            input.value = span.textContent;
            //remove the span 
            span.remove();
            //append the input to the li
            li.prepend(input);
    }

    //fonction create span prend an li ,create a span and append it to it 
    function CreateSpan (li,input){    
        const span = createElement("span","textContent", input.value);
        li.prepend(span);
        
    }


    /*BUTTON AND EVENTS*/
    

    list.addEventListener("click",(event)=>{

        const btn = event.target;
        const li = btn.parentNode;
        const ul = li.parentNode;
        const inputText = li.querySelector("input[type=text]");
        const span = li.querySelector("span");
        
        if(btn.tagName ==="BUTTON" && btn.textContent === "Remove" ){
                li.remove();
        }
        else if ( btn.tagName ==="BUTTON" && btn.textContent === "Edit" ){
                CreateInput(li,span);
                btn.textContent = "Save"
                }

        else if ( btn.tagName === "BUTTON" && btn.textContent ==="Save" ){
                CreateSpan (li,inputText);
                inputText.remove();
                btn.textContent = "Edit"
            }
    });

    //to respond to clicks on a form's submit button as well as pressing enter while one of the fields is active we use the submit event
    form.addEventListener("submit",(event)=>{
                
        //    const isString = checkinputValue(input);
            event.preventDefault();
            if (input.value == ""){
              alert("this value can not be empty");
                }
                else {
                    const boolean = checkinputValue(input);

                    if (boolean){   
                        input.value = "";
                        alert("The me should contain only letters");
                        
                    }
                    else{
                    //Call the CreatListItem function
                    CreateListItem ();
                    //the input will clear up when the click the button
                    input.value ="";
                }

                
            }
            
            


    });

    /*The onchange event occurs when the value of an element has been changed.
    For radiobuttons and checkboxes, the onchange event occurs when the checked state has been changed.*/

    list.addEventListener("change",(event)=>{

            const checkbox = event.target;
            const checked =checkbox.checked;
            const li =checkbox.parentNode.parentNode;
            if (checked){
            //if the button confirmed is checked we will add the class responded to the li
            console.log(li);
            li.className ="responded";

            }
            else {
                li.className ="";

            }

        });

    checkBoxConfirmed.addEventListener("change",(event)=>{
        

            const list = document.getElementsByTagName("li");
            
            if (checkBoxConfirmed.checked){
            console.log("checked");
            for (let i=0 ; i < list.length; i++){

                if (list[i].className ==="responded"){
                    list[i].style.display ="";
                }
                else {
                    list[i].style.display ="none";
                }

                }//fin if



            }
            else {
                console.log("unchecked");
                for (let i=0 ; i < list.length; i++){
        
                        list[i].style.display ="";
                    }//fin for
                
                    
                }//fin else
        });

});