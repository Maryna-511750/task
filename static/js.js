document.addEventListener('DOMContentLoaded', function() {
    const transfer = document.querySelector("#transfer");
    const transfer_value = document.querySelector("#transfer_value");
    const storage = document.querySelector("#storage");
    const storage_value = document.querySelector("#storage_value");
    const graph = document.querySelectorAll(".graph");
    const hdd = document.querySelector('#hdd');
    const ssd = document.querySelector("#ssd");
    const multi = document.querySelector('#multi');
    const single = document.querySelector("#single");

    transfer.onchange = function() {
        transfer_value.innerHTML = `${transfer.value}GB`;
        graph_column(storage, transfer);
    };

    storage.onchange = function() {
        storage_value.innerHTML = `${storage.value}GB`;
        graph_column(storage, transfer);
    };


    document.addEventListener('click', event => {
        // Знайти, що було натиснуто
        const element = event.target;

        // Перевірити, чи користувач натиснув кнопку radio
        if ((element.id === 'hdd') || (element.id === 'ssd') || (element.id === 'multi') || (element.id === 'single')){
        let column_graph = document.querySelector(`#${element.name}`);
        column_graph.dataset.storage = `${element.dataset.price}`;
        graph_column(storage, transfer);
        };
    });


    function graph_column(storage, transfer){
        let min_price = 1000;
        graph.forEach(function(column) {
            let price = (storage.value * parseFloat(column.dataset.storage))+(transfer.value * parseFloat(column.dataset.transfer));
            if (column.dataset.limit) {
                price = ((storage.value - column.dataset.limit) * parseFloat(column.dataset.storage))+((transfer.value - column.dataset.limit) * parseFloat(column.dataset.transfer));
                if (price < 0) {
                    price = 0;
                }
            price = price.toFixed(2);
            }
            if (column.dataset.min > price) {
                price = column.dataset.min;
            }
            if (column.dataset.max < price) {
                price = column.dataset.max;
            }
            column.style.width = `${price}%`;
            column.nextSibling.innerHTML = `${price}$`;
            if (min_price > price) {
                min_price = parseFloat(price);
            }
        });
        graph.forEach(function(column) {
            if (min_price == parseFloat(column.style.width)){
                column.style.background = "#cc99ff";
            }
            else {
                column.style.background = "gray";
            }
        });
    }

});
