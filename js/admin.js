import { getContents, deleteContent,updateContent,createContent} from "./api.js";
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
    if(e.target.classList.contains("edit")){
        let id=e.target.dataset.id;
        let item=items.find(i=>i.id==id);

        if(!item)return;
        
        title.value=item.title;
        type.value=item.type;
        year.value=item.releaseYear;
        Image.value=item.image;
        genres.value=item.genres.join(", ");
        duration.value=item.duration || "";
        seasons.value=item.seasons || "";

        editId=id;

        formTitle.textContent="Modifier un contenu";
        submitBtn.textContent="Modifier";

        clear();
        
    }
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
        duration: type.value==="film" ? Number(duration.value) : null,
        seasons: type.value==="serie" ? Number(seasons.value) : null
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
        document.getElementById("title-error").textContent="titre obligatoire";
        valid=false;
    }
    if(type.value===""){
        document.getElementById("type-error").textContent="choisir un type";
        valid=false;
    }
    if(year.value<1900|| year.value > currentYaer|| year.value===""){
        document.getElementById("year-error").textContent="annee invalid";
        valid=false;
    }
    if(Image.value===""||!Image.value.startsWith("http")){
        document.getElementById("image-error").textContent="URL invalide"
        valid=false;
    }
    if(type.value==="film"){
        if(duration.value==="" || duration.value <= 0){
            document.getElementById("duration-error").textContent="duree obligatoire";
            valid=false;
        }
    }
       if(type.value==="serie"){
    if(seasons.value==="" || seasons.value <= 0){
        document.getElementById("seasons-error").textContent="Nombre de saisons obligatoire";
        valid=false;
    }
}
    return valid;

}
form.addEventListener("submit",async function (e) {
    e.preventDefault();
    if(!validateForm()){
        return;
    }
    let data=getFormData();
    try{
        if(editId===null){
            let newItem= await createContent(data);
            items.push(newItem);
            message.textContent="ajout reussir";
    }else{
        let item=items.find(i=>i.id==editId);
        let updated={
            ...item,
            ...getFormData()
        };
        let result=await updateContent(editId,updated);
        for(let i=0;i<items.length;i++){
            if(items[i].id==editId){
                items[i]=result;
            }
        }
        message.textContent="modification resussie";
    }
    renderTable(items);
    form.reset();
    editId=null;
    formTitle.textContent="ajouter un contenu";
    submitBtn.textContent="ajouter";

    clear();
     }catch(error){
        message.textContent="erreur lors de l enregistrement";
     }
})

