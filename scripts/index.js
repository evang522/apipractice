
'use strict';

const apiInt = function() {

    const URL = 'https://thinkful-list-api.herokuapp.com/evan'

    const fetchData = (callback) => {
        
        $.getJSON(`${URL}/items`,callback)
    }

    const addItemToAPI = (itemName) => {
        let updateObj = JSON.stringify({
            name:itemName
        });

        $.ajax(`${URL}/items`,{
            data:updateObj,
            method:'POST',
            contentType:'application/json',
            success:(data) => {
                list.loadPage();
            }
        })
    }

    const deleteItemFromAPI = (id) => {

        $.ajax(`${URL}/items/`,{
            method:'DELETE',
            success:(data) => {
                list.loadPage();
            }
        })
    }

    return {
        addItemToAPI,
        fetchData
    }

}();


const store = function() {
    const addItemsToStore = function(arrayFromJSON) {
        arrayFromJSON.forEach((item) => {
            (store.items).push(item);
        })
    };
    const items = [];
    return {
        addItemsToStore,
        items
    }
}();


const list = function () {

    const generateHTML = function (array) {
        let domString = '';
        array.forEach((item) => {
            domString+= `
            <li class='item'>
                <span class=${item.checked ? 'checked' : ''}>${item.name}</span>
                <br>
                <br>
                <span>ID: ${item.id}</span>
                <br>
            </li>`
        });
        return domString;
    };

    const pushToDom = (domString) => {
        $('.results').html(domString);
    };

    const loadPage = () => {
        apiInt.fetchData((data) => {
            store.addItemsToStore(data);
            let domString = list.generateHTML(store.items);
            list.pushToDom(domString);
        })

        listen();
    }

    const listen = () => {
        $('.submit-item-form').on('submit', (event) => {
            event.preventDefault();
            let userInput = $('.submit-item-input').val();
            $('.submit-item-input').val('');
            apiInt.addItemToAPI(userInput);
            
        } )
    }

    return {
        generateHTML,
        pushToDom,
        loadPage
    }
}();



$(list.loadPage);