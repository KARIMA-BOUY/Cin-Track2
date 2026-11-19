import { getContents, deleteContent } from "./api.js";
const table=document.getElementById("content-table");
const message=document.getElementById("message");
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