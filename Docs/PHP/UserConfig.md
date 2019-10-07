#Configuracion de Usuario
- Input Org
```javascript
    { 
          uid: "",
          name: "",
          last: "",
          nat: "",
          bio: "",
          org: "",
          birth: "",
          role: <int>,
          phone: ["phone1", "phone2", ..., "phoneN" ]
    }
```
- Input Ind
```javascript
     { 
            uid: "",
            name: "",
            desc: "",
            country: "",
            addr: "",
            role: <int>,
            phone: ""
     } 
```
> Sera necesario que te encarges de guardar el role en la tabla de usuario.
> En ambos casos la photo ira en $FILES['photo']

- Output Success
```javascript
     {
        status: 1
     }
```

- Output Failed
```javascript
         {
            status: 0,
            message: ""
        } 
```

#Crear Ideas
Script que devuelva categorias
> No input here

- Output Success

```javascript
    {
        status: 1,
        cats: [{id:1, name: "nombre1"},
           {id:2, name: "nombre2"},
           {id:3, name: "nombre3"},
           ...
            {id:N, name: "nombreN"}
           ]}
```

- Output Failed

```javascript
     {
            status: 0,
            message: ""
     }
```

####Script que guarde ideas de usuario

- Input
```javascript
    {
         title: 'title',
         desc:'desc',
         cat:'categoria',
         uid:'uid'
    }
```

- Output Success
```javascript
     {
        status: 1
     }
```
- Output Failed
```javascript
     {
            status: 0,
            message: ""
     }   
```

> Update Idea es igual


#Informacion de Usuario

- Input

```javascript
    {
        uid: ""
    }
```

- Output Individual

```javascript 
     { 
              name: "",
              last: "",
              nat: "",
              bio: "",
              org: "",
              birth: "",
              role: <int>,
              phone: ["phone1", "phone2" , ..., "phoneN" ]
     }
```

- Output Organizacion

```javascript 
        { 
                name: "",
                desc: "",
                country: "",
                addr: "",
                role: <int>,
                phone: ""
         }
```

#### Photo 

- Input

```javascript
    {
        uid: ""
    }
```

[Upload Image](https://stackoverflow.com/questions/900207/return-a-php-page-as-an-image)


#Listar Ideas (Emprendedor)

- Input

```javascript
    {
        uid: "",
        search: '',
        page: <int>
    }
```

> Search deberia buscar en el titulo pero no se llamaria 
> Exactamente igual, SQL puede usar LIKE

[LIKE](https://www.w3schools.com/sql/sql_like.asp)

> Dejaremos de fijo 4 filas por pagina

- Output

```javascript 
    {
        maxPage: <int>,
        ideas: [ {id: "id1" , title: "tittle1"},
                  {id: "id2" , title: "tittle2"},
                  {id: "id3" , title: "tittle3"},
                   {id: "id4" , title: "tittle4"}
               ]
    }
```

> Si no son ni cuatro envia solo lo que haya, maxPage = 1.
> Si el usuario no tiene ideas envia maxPage = 0.
> maxPage depende de lo que se envie en search
> i.e. Si las ideas son 17, maxPage seria 5; 4*4 = 16 pero necesitamos una
> pagina mas para la ultima idea 



#Listar Ideas (Financista)

- Input

```javascript
    {
        category: '',
        page: <int>,
        rows: <int>
    }
```



- Output

```javascript 
    {
        maxPage: "Numero Maximo de pagina, depende de la categoria",
        ideas: [{id: "id1 , "title:"title1", desc: "descripcion1", autor: "autor2_nombre autor2_apellido"}, 
                {id: "id2 , "title:"title2", desc: "descripcion2",  autor: "autor1_nombre autor1_apellido"}, ... 
                {id: "idRows , "title:"titleRows", desc: "descripcionRows", autor: "autorRows_nombre autorRows_apellido"}]
    }
```

> MaxPage seria el numero maximo de paginas segun la categoria y rows.
> A Rows le di como minimo 1 maximo 5
<!-- > Tal vez pueda obtener el role del mismo uid pero ya vere
> despues, si hay tiempo -->

