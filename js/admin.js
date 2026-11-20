import { getContents, deleteContent,updateContent} from "./api.js";
const table=document.getElementById("content-table");
const message=document.getElementById("message");
const title=document.getElementById("title");
const type=document.getElementById("type");
const year=document.getElementById("year");
const Image=document.getElementById("Image");
const form=document.getElementById("content-form");
const formTitle=document.getElementById("form-title");
const submitBtn=document.getElementById("submit-btn");
const genres=document.getElementById("genres");
const duration=document.getElementById("duration");
const seasons=document.getElementById("seasons");

let editId=null;



let items=[];
function renderTable(items){
    table.innerHTML=items.map(item =>{
        return`
         <tr class="border-b border-slate-700">
            <td class="p-3"><img src="${item.image}" width="60"></td> 
            <td class="p-3">${item.title}</td>
             <td class="p-3">${item.type}</td>
              <td class="p-3">${item.releaseYear}</td>
               <td class="p-3">
                <button class="edit bg-blue-600 px-3 py-2 rounded" data-id=${item.id}>Modifier</button>
                 <button class="delete bg-red-600 px-3 py-2 rounded" data-id=${item.id}>Supprimer</button>
                 </td>
            </tr>
        `;
    }).join("");
}
async function init(){
    message.textContent="chargement...";
    try{
        items=await getContents();
        renderTable(items);
        message.textContent="";
    }catch(error){
        message.textContent="Erreur lors du chargement";
    }
}
init();
table.addEventListener("click",async function (e) {
    if(e.target.classList.contains("delete")){
        let id=e.target.dataset.id;
        let item;
        for(let i=0;i<items.length;i++){
            if(items[i].id==id){
                item=items[i];
            }
        }
        if(!confirm("voulez-vous supprimer" + item.title+ "?")){
            return;
        }
        try{
            await deleteContent(id);
            items=items.filter(function(item){  
                 return item.id != id;
            })
                renderTable(items);
                message.textContent="suppression reussie";
        }catch(error){
            message.textContent="Erreur de suppresion";
        }
    }
});


function getFormData(){
    return{
        title:title.value,
        type:type.value,
        releaseYear:Number(year.value),
        image:Image.value,
        genres:genres.value.split(",").map(g=>g.trim()),
        duration:Number(duration.value),
        seasons:Number(seasons.value)
    };
}
function clear(){
    document.getElementById("title-error").textContent="";
    document.getElementById("type-error").textContent="";
    document.getElementById("year-error").textContent="";
    document.getElementById("image-error").textContent="";
    document.getElementById("duration-error").textContent="";
    document.getElementById("seasons-error").textContent="";
}
function validateForm(){
    clear();
    let valid=true;
    let currentYaer=new Date().getFullYear();

    if(title.value===""){
        document.getElementById("title-error").textContent="choisir un type";
        valid=false;
    }
    if(year.value<1990 || year.value > currentYaer || year.value===""){
        document.getElementById("year-error").textContent="annee invalid";
        valid=false;
    }
    if(Image.value===""||!Image.value.startsWith("http")){
        document.getElementById("image-error").textContent="URL invalide"
        valid=false;
    }
}

