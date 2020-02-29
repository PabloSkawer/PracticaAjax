const resultado = document.getElementById("resultado");
const resultado2 = document.getElementById("resultado2");
var categoria = document.getElementById("categoria");
var breed = document.getElementById("breed");
var urlcategoria = `https://api.thecatapi.com/v1/categories`;
var breed_id = []
var id;
var b_id;
var pag=1;
var foto_id=[]
let i=0;

document.getElementById("buscar").addEventListener('click', function () {
   obtenerDatos(pag);
   document.getElementById("anterior").addEventListener("click",function(){
      pag--;
      document.getElementById("actual").innerText=pag
      obtenerDatos(pag);
      
   })
   document.getElementById("posterior").addEventListener("click",function(){
      pag++;
      document.getElementById("actual").innerText=pag
      obtenerDatos(pag); 
   })
});
   document.getElementById("ultimap").addEventListener("click",function(){
   pag=15;
   document.getElementById("actual").innerText=pag
   
   if (i<1)obtenerDatos(pag); 
   else alert("ya estas en la ultima")
   i++; 
})

buscar.addEventListener('click', function () {
   if (categoria.value == 'hats') id = 1;
   else if (categoria.value == 'sunglasses') id = 4;
   else if (categoria.value == 'clothes') id = 15;
   else if (categoria.value == 'boxes') id = 5;
   else if (categoria.value == 'sinks') id = 14;
   else if (categoria.value == 'space') id = 2;
   else if (categoria.value == 'ties') id = 7;
   else if (categoria.value == 'none') id = 0;
   obtenerDatos();
});

document.getElementById("buscar2").addEventListener('click', function () {
   obtenerDatos2();
   document.getElementById("anterior").addEventListener("click",function(){
      obtenerDatos2();
   })
   document.getElementById("posterior").addEventListener("click",function(){
      obtenerDatos2();
   })
});



window.addEventListener("load", function () {
   let url = urlcategoria;
   const api = new XMLHttpRequest();
   api.open('GET', url, true);
   api.send();
   api.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
         let datos = JSON.parse(this.responseText);
         for (let item of datos) {
            foto_id=item.id
            var option = document.createElement("option");
            option.innerHTML = `${item.name}`;
            categoria.appendChild(option);
         }
      }
   }
});
window.addEventListener("load", function () {
   let url =`https://api.thecatapi.com/v1/images/search?limit=100`;
   const api = new XMLHttpRequest();
   api.open('GET', url, true);
   api.send();
   api.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
         let datos = JSON.parse(this.responseText);
         for (let item of datos) {
            var option = document.createElement("option");
            foto_id=item.id;
            console.log(foto_id)
            option.innerHTML = `${item.name}`;
         }
      }
   }
});

window.addEventListener("load", function () {
   let url = `https://api.thecatapi.com/v1/breeds`;
   const api = new XMLHttpRequest();
   api.open('GET', url, true);
   api.send();
   api.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
         let datos = JSON.parse(this.responseText);
         for (let item of datos){
            var option=document.createElement("option");
            option.value=item.id;
            option.id=item.id;
            option.innerHTML=item.name;
            document.getElementById("breed").appendChild(option);
         }
         }
      }
});

function obtenerDatos(pag) {
   let url = `https://api.thecatapi.com/v1/images/search?limit=8&page=${pag}&category_ids=${id}`;
   const api = new XMLHttpRequest();
   api.open('GET', url, true);
   api.send();
   api.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
         let datos = JSON.parse(this.responseText);
         resultado.innerHTML = '';
         for (let item of datos) {
            console.log(foto_id)
            resultado.innerHTML += `<img width=300px height=200px src=${item.url}>`;
         }
      }
   }
}

function obtenerDatos2() {
   b_id=document.getElementById("breed").value
   let url = `https://api.thecatapi.com/v1/images/search?limit=8&breed_id=${b_id}`;
   const api = new XMLHttpRequest();
   api.open('GET', url, true);
   api.send();
   api.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
         let datos = JSON.parse(this.responseText);
         resultado.innerHTML = '';
         for (let item of datos) {
            resultado.innerHTML += `<img width=300px height=200px src=${item.url}>`;
         }
      }
   }
}