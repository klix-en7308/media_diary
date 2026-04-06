<style lang="css" scoped>
.row{
    display: flex;
    flex-direction: row;
    column-gap: 5px;
    margin-top: 10px;
}
.smal{
    color: #506a8d;
    font-family: monospace;
    font-weight: bold;
}
.title{
    font-family: monospace;
    font-size: 14px;
    letter-spacing: 0.5px;
    
    
}
.keterangan{
    font-family: 'Courier New', Courier, monospace;
    color: #506a8d;
    font-size: 12px;
}
button{
    background: none;
    font-family: 'Courier New', Courier, monospace;
    color: #506a8d;
    font-size: 12px;
    border: none;
    padding: 0;

}
button:hover{
    cursor: pointer;
    text-decoration: underline;
}
#deletebtn{
    color: rgb(130, 50, 50) !important;
}
</style>
<template>
    <div class="row">
        <div class="smal">></div>
        <div class="rigg">
            <div class="title">{{ props.title }}</div>
            <div class="keterangan">
                category: {{ props.category }} | rating: {{ props.rating }} / 5 | <button @click="view">view</button> | <button id="deletebtn" @click="deleteEntry">delete</button> 
    
            </div>
        </div>
    </div>
    
</template>
<script setup>
const props = defineProps({
    id: Number,
    title: String,
    category: String,
    date: Date,
    rating: Number,
    content: String
});
const emit = defineEmits(['delete-entry', 'view-entry']);
const deleteEntry = ()=>{
    console.log(props.id);
    emit('delete-entry', props.id)
}
const view = ()=>[
    emit('view-entry', props.id)
]
</script>