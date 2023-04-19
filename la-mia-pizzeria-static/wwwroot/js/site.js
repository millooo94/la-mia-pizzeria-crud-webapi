// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// <Pizzas>

const loadPizzas = filter => getPizzas(filter).then(renderPizzas);

const getPizzas = name => axios
    .get('/api/pizzas', name ? { params: { name } } : {})
    .then(res => res.data);

const renderPizzas = pizzas => {
    const noPizzas = document.querySelector("#no-pizzas");
    const loader = document.querySelector("#pizzas-loader");
    const pizzasTbody = document.querySelector("#pizzas");
    const pizzasTable = document.querySelector("#pizzas-table");
    const pizzaFilter = document.querySelector("#pizzas-filter");

    if (pizzas && pizzas.length > 0) {
        pizzasTable.classList.add("show");
        pizzaFilter.classList.add("show");
        noPizzas.classList.remove("show");
    }
    else noPizzas.classList.add("show");

    loader.classList.add("hide");

    pizzasTbody.innerHTML = pizzas.map(pizzaComponent).join('');
};

const pizzaComponent = pizza => `
    <tr>
        <td>${pizza.id}</td>
        <td class="image"><img class="pizza-link-image" src="${pizza.img}"></td>
        <td class="name">
            <a href="/pizza/detail/${pizza.id}">${pizza.name}</a>
        </td>
       <td class="description">${pizza.description}</td>
       <td class="price">${pizza.price}</td>
       <td>${pizza.category.name}</td>
       <td>
            <a href="/pizza/update/${pizza.id}" class="btn btn-warning delete">Edit</a>
            <button class="btn btn-danger">Delete</button>
        </td>
    </tr>`;

const initFilter = () => {
    const filter = document.querySelector("#pizzas-filter input");
    filter.addEventListener("input", (e) => loadPizzas(e.target.value))
};

// </Pizzas>

// <Categories>

const loadCategories = () => getCategories().then(renderCategories);

const getCategories = () => axios
    .get("/api/category")
    .then(res => res.data);

const renderCategories = categories => {
    const selectCategory = document.querySelector("#category-id");
    selectCategory.innerHTML += categories.map(categoryOptionComponent).join('');
};

const categoryOptionComponent = category => `<option value=${category.id}>${category.name}</option>`;

// </Categories>

// <Ingredients>

const loadIngredients = () => getIngredients().then(renderIngredients);

const getIngredients = () => axios
    .get("/api/ingredient")
    .then(res => res.data);

const renderIngredients = ingredients => {
    const ingredientsSelection = document.querySelector("#ingredients");
    ingredientsSelection.innerHTML = ingredients.map(ingredientOptionComponent).join('');
}

const ingredientOptionComponent = ingredient => `
	<div class="flex gap">
		<input id="${ingredient.id}" type="checkbox" />
		<label for="${ingredient.id}">${ingredient.name}</label>
	</div>`;

// </Tags>

// <CreatePost>

const postPizza = pizza => axios
    .post("/api/pizzas", pizza)
    .then(() => location.href = "/pizza/index")
    .catch(err => renderErrors(err.response.data.errors));

const initCreateForm = () => {
    const form = document.querySelector("#pizza-create-form");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const pizza = getPizzaFromForm(form);
        postPizza(pizza);
    });
};

const getPizzaFromForm = form => {
    const name = form.querySelector("#name").value;
    const description = form.querySelector("#description").value;
    const price = form.querySelector("#price").value;
    const categoryId = form.querySelector("#category-id").value;
    /*const ingredients = form.querySelectorAll("#ingredients input");*/
    const img = form.querySelector("#img").value;

    return {
        id: 0,
        name,
        description,
        price,
        categoryId,
        img,
    };
};

const renderErrors = errors => {
    const nameErrors = document.querySelector("#name-errors");
    const descriptionErrors = document.querySelector("#description-errors");
    const priceErrors = document.querySelector("#price-errors");
    const categoryIdErrors = document.querySelector("#category-id-errors");

    nameErrors.innerText = errors.Name?.join("\n") ?? "";
    descriptionErrors.innerText = errors.Description?.join("\n") ?? "";
    priceErrors.innerText = errors.Price?.join("\n") ?? "";
    categoryIdErrors.innerText = errors.CategoryId?.join("\n") ?? "";
};

// </CreatePost>

const initUpdateForm = (id) => {
    const form = document.querySelector("#post-edit-form");
    const name = document.querySelector("#name");
    const description = document.querySelector("#description");
     const price = document.querySelector("#price");
     const categoryId = form.querySelector("#category-id");
     const img = form.querySelector("#img");

    getPizza(id).then(pizza => {
         name.value = pizza.name;
         description.value = pizza.description;
         price.value = pizza.price;
         categoryId.value = pizza.categoryId;
         img.value = pizza.img;
    });
};

const getPizza = id => axios
     .get(`/api/pizzas/${id}`)
    .then(res => res.data);
