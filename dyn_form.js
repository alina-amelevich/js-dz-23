'use strict';

function dyn_form(tagForm, content) {
    let formHtml = '';
    for (const el of content) {
        formHtml += '<div class="form_element">';
        if (el.kind === 'submit') {
            formHtml += '<input type="submit" value="' + el.label + '">';
        } 
        else {
            formHtml += '<span>' + el.label + '</span>';
    
            if (el.kind === 'longtext') {
                formHtml += '<input type="text" class="longtext" name="' + el.name + '">';
            }
            if (el.kind === 'number') {
                formHtml += '<input type="number" name="' + el.name + '">';
            }
            if (el.kind === 'shorttext') { //Пусть элемены типа 'shorttext' будут считаться полями для ввода E-mail
                formHtml += '<input type="text" class="shorttext" name="' + el.name + '">';
            }
            if (el.kind === 'combo') {
                formHtml += '<select name="' + el.name + '" class="combo">';
                for (const option of el.variants) {
                    formHtml += '<option value="' + option.value + '">' + option.text +'</option>';
                }
                formHtml += '</select>';
            }
            if (el.kind === 'radio') {
                let id = '';
                for (const option of el.variants) {
                    id = option.value;
                    formHtml += '<input type="radio" name="' + el.name + '" value="' + option.value + '"' + ' id="' + id + '">' 
                    + '<label for="' + id + '">' + option.text + '</label>';
                }
            }
            if (el.kind === 'check') {
                formHtml += '<input type="checkbox" name="' + el.name + '">';
            }
            if (el.kind === 'memo') {
                formHtml += '</div><div><textarea name="' + el.name + '" class="memo"></textarea>';
            }
        }
        formHtml += '</div>';
    }
    tagForm.innerHTML = formHtml;
};

(function() {
    let frm1 = document.forms.form1;
    let frm2 = document.forms.form2;
    let formDef1 = [
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
    {label:'E-mail для связи:',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога:',kind:'combo',name:'division',
        variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение:',kind:'radio',name:'payment',
        variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы:',kind:'check',name:'votes'},
    {label:'Описание сайта:',kind:'memo',name:'description'},
    {label:'Опубликовать:',kind:'submit'},
    ];
    let formDef2 = [
    {label:'Фамилия:',kind:'longtext',name:'lastname'},
    {label:'Имя:',kind:'longtext',name:'firstname'},
    {label:'Отчество:',kind:'longtext',name:'secondname'},
    {label:'Возраст:',kind:'number',name:'age'},
    {label:'Зарегистрироваться:',kind:'submit'},
    ];

    dyn_form(frm1, formDef1);
    dyn_form(frm2, formDef2);
})( );