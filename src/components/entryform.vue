<script setup>
import { ref, onMounted, computed, watch } from "vue";

const emit = defineEmits(['submit-form']);

const inputs = ref({
    title: '',
    category: '',
    date: '',
    rating: 1,
    content: ''
})



const addEntry = ()=>{
    for(const [key,value] of Object.entries(inputs.value)){
        if(value === '' || value === null){
            window.alert('fill in ur stuff');
            return 
        }
    }
    emit('submit-form', {title: inputs.value.title, category: inputs.value.category, date: new Date(inputs.value.date), rating: inputs.value.rating, content: inputs.value.content });
}
</script>

<template>
    <div>
        <form @submit.prevent="addEntry">
            <div class="row">
                <label for="title">title </label>
                <input type="text" v-model="inputs.title">
            </div>
            <div class="row">
                <label for="date">date </label>
                <input type="date" v-model="inputs.date">
            </div>
            <div class="row">
                <div class="left">
                    
                    <label for="date">category </label>
                    <br>
                    <select v-model="inputs.category">
                        <option disabled value="">Please select one</option>
                        <option>games</option>
                        <option>music</option>
                        <option>food</option>
                        <option>books</option>
                        <option>movies</option>
                        <option>tv-show</option>
                    </select>
                </div>
                <div class="left">
                    <label for="rating">rating </label>
                    <input type="number" min="1" max="5" v-model="inputs.rating">
                </div>
            </div>
            <label for="note" style="margin-top: 10px;">notes </label>
            <br>
            <textarea v-model="inputs.content">

            </textarea>
            <input type="submit" value="submit entry" >

        </form>
    </div>
</template>
<style lang="css" scoped>
template{
    color: white;
}
form{
    padding: 20px;
    padding-right: 40px;
}
.row{
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
    column-gap: 10px;
}
.row label{
    width: 30%;
}
.row input{
    width: 100%;
}
.left{
    width: 50%;
}
input{
    background-color: black;
    border-bottom: 1px solid rgb(105, 48, 48);
    border-left: none;
    border-right: none;
    border-top: none;
    color: rgb(105, 48, 48)
}
input:focus{
    background-color: black;
    border-bottom: 1px solid rgb(105, 48, 48);
    border-left: none;
    border-right: none;
    border-top: none;
    color: rgb(105, 48, 48);
    outline: none;
}
textarea{
    width: 100%;
    height: 200px;
    background-color: black;
    border: 1px solid rgb(105, 48, 48);
    color: gray;
    margin-top: 10px;
    padding: 10px;
    font-size: 11px;
    font-family: 'Courier New', Courier, monospace;
}
textarea:focus{
    outline: none;
}
input[type="submit"]{
    background-color: rgb(105, 48, 48);
    color: black;
    cursor: pointer;
}
</style>