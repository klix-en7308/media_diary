
<script setup>
import { computed } from 'vue';
import Single from './single.vue';

    const props = defineProps(
        {
            entries: [{
                id: Number,
                title: String,
                category: String,
                date: Date,
                rating: Number,
                content: String
            
            }],
            dates: [Number]
        }
    )

    const emit = defineEmits(['update-entries', 'view-entry'])

    const sorteddates = computed(()=>{
        return props.dates.sort((a,b)=> new Date(b).getTime() - new Date(a).getTime());
    })
    
    const deleteEntryApp = (id)=>{
        console.log(id);
        let newentries = props.entries.filter(entry => !(entry.id == id));
        emit('update-entries', newentries)
    }

    const viewEntryApp = (id)=>{
        emit('view-entry', id)
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
</script>
<template>
    <div class="maincontainer">
    <div class="entriess" v-for="dates in sorteddates">
        <div class="dateting">{{ new Date(dates).toLocaleDateString('en-GB', options) }}</div>
        <div v-for="entry in props.entries">
            <Single @delete-entry="deleteEntryApp" @view-entry="viewEntryApp" v-if="entry.date.toISOString().slice(0, 10) == dates" :title="entry.title" :category="entry.category" :id="entry.id" :date="entry.date" :rating="entry.rating" :content="entry.content"></Single>
        </div>
    </div>
    <div class="flavor" v-if="sorteddates.length == 0">
        nothing's here... add something!
    </div>
    </div>
</template>
<style lang="css" scoped>
.maincontainer{
    background-color: white;
    padding: 0px 20px;
}
.dateting{
    font-family: monospace;
    font-size: 18px;
    background-color: #8BABD6;
    padding: 5px 5px 0px 5px;
    width: fit-content;
    margin-top: 20px;
    color: white;
}
.flavor{
    text-align: center;
    padding: 20px;
    font-size: 13px;
    color: #506a8d
}
</style>