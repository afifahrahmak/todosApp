// pilih form todo
let todoForm = document.querySelector('.todo-form')
// pilih input box saja
let todoInput = document.querySelector('.todo-input')
// pilih tombol add saja
let todoItemsList = document.querySelector('.todo-items')

todoForm.addEventListener('submit', function (event) {
    event.preventDefault() //mencegah halaman refresh/reload
    // console.log(todoInput.value)
    addTodo(todoInput.value)
})

let todos = []
console.log(todos)

//menambahkan todo baru kedalam todos(array) + memasukan data todos ke local storage
function addTodo(item) {
    console.log(item)
    //validasi todo tidak boleh kosong
    if (item !== '') {
        //membuat objek todo 
        let todo = {
            id: Date.now(),
            name: item,
            completed: false
        }

        // menambahkan todo ke dalam array todos
        todos.push(todo)

        // menyimpan data todos ke local storage
        addToLocalStorage(todos)

        //mengosongkan input / clear the input
        todoInput.value = ""
    } else {
        alert('todo tidak boleh kosong')
    }
}

/**
 * todos = [
 *      {
 *          id: 1618405063103,
 *          name: "asdasd",
 *          completed: false
 *      }
 * ]
 */


// manampilkan data todos
function renderTodos(todos) {
    //kosongin ul todo-items terlebih dahulu, agar data tidak tumpang tindih
    todoItemsList.innerHTML = ''

    //looping data todosnya
    todos.forEach(item => {

        /**
         * CONTOH ELEMENT / TAG li YG TELAH DIBUAT
        <li class="item" data-key="1618405063103">
                <input class="checkbox" type="checkbox" ... >
                Join classroom
                <button class="delete-button">x</button>
        </li>
         */

        // membuat tag li `<li> </li>`
        const li = document.createElement('li') // <li> </li>

        // menambahkan class bernama `item` ke dalam tag li tadi
        li.setAttribute('class', 'item') // <li class="item"> </li>

        //menambahkan data-key kedalam li
        // <li class="item"  data-key="1618405063103"> </li>
        li.setAttribute('data-key', item.id)

        // kalau todonya complete, maka tambahkan class checked kedalam tag li, agar bisa berubah style jadi line-through
        if (item.completed === true) {
            // <li class="item checked"  data-key="1618405063103"> </li>
            li.classList.add('checked')
        }

        //menambahkan / menandakan data todo yang sudah completed
        let checked;
        if (item.completed) {
            checked = 'checked'
        } else {
            checked = null
        }
        //contoh ternary op.
        // let checked = item.completed ? 'checked' : null

        li.innerHTML = `
        <input class="checkbox" type="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">x</button>
        `
        //menambahkan tag li kedalam ul (todoItemsList)
        todoItemsList.append(li)
    });
}

// menyimpan data todos ke local storage
function addToLocalStorage(todos) {
    // data yang dimasukan harus berupa string, jika tidak dia terbaca sebagai [Object object]
    // convert data dari array, ke JSON string
    let dataJSON = JSON.stringify(todos)

    //menyimpan data yang telah di convert ke local storage
    localStorage.setItem('todos', dataJSON)

    //menampilkan data todos
    renderTodos(todos)
}

// fungsi untuk merubah data todo completed / not completed
function toggle(id) {
    // dengan memanfaatkan id dari masing-masing todo

    // cari todo yang id-nya terpilih (parameter)
    todos.forEach(item => {
        // kalau id-nya sama (terpilih), maka kita ubah value completednya
        if (item.id == id) {
            // if (item.completed === true) {
            //     item.completed = false
            // } else {
            //     item.completed = true
            // }

            //true jadi false, false jadi true
            item.completed = !item.completed
        }
    })

    //update data, simpan dan masukan ke LS
    addToLocalStorage(todos)
}


// menghapus todo dengan ID, memanfaat filter
function deleteTodo(id) {

    //mengupdate data todos , dengan memfilter idnya
    todos = todos.filter(function (item) {
        // datanya adalah todo dengan id yang tidak dipilih
        return item.id != id
    })

    // update data, simpan dan masukan ke LS
    addToLocalStorage(todos)
}


//fungsi checkbox (toggle) & deleteTodo dijalankan ketika :
// ul (todoItemsList) di clik, bergantung pada element apa yg diklik
todoItemsList.addEventListener('click', function (event) {

    //mengambil data id terpilih :
    let id = event.target.parentElement.getAttribute('data-key')
    console.log(id)

    // cek apakah yang di clik itu checkbox
    if (event.target.type === 'checkbox') {
        //jalankan fungsi toggle
        toggle(id)
    }

    // console.log(event.target.classList.contains('delete-button'))
    // cek apakah button delete yang di click
    if (event.target.classList.contains('delete-button')) {
        deleteTodo(id)
    }
})

//menampilkan data yang telah diperbaharui / diupdate dari local storage
function getFromLocalStorage() {
    //mengambil data dari local storage, data masih berupa string of arr of obj
    let ref = localStorage.getItem('todos')

    // jika ada datanya, maka kita convert datanya menjadi array
    if (ref) {
        // memperbaharui todos dengan data dari LS yang telah di convert
        todos = JSON.parse(ref) // sudah berupa array of obj
        // console.log(ref, todos)

        //tampilkan todos terbaru
        renderTodos(todos)
    }
}
getFromLocalStorage() // panggil fungsi terus menerus, default fungsi