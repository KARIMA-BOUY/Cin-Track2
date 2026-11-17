import { getContents} from "./api.js";
import { renderCatalog } from "./ui.js";

async function init() {
    try{
     const data = await getContents();
    renderCatalog(data);
    }catch(error){
        console.log(error.message);
    }
}
init();