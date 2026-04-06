
<script setup>
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
        dates.sort((a,b)=> new Date(b).getTime() - new Date(a).getTime());
    })
    
    const deleteEntryApp = (id)=>{
        console.log(id);
        let newentries = props.entries.filter(entry => !(entry.id == id));
        emit('update-entries', newentries)
    }

    const viewEntryApp = (id)=>{
        emit('view-entry', id)
    }
</script>
<template>
    <div class="entriess" v-for="dates in props.dates">
        <h2>{{ dates }}</h2>
        <div v-for="entry in props.entries">
            <Single @delete-entry="deleteEntryApp" @view-entry="viewEntryApp" v-if="entry.date.toISOString().slice(0, 10) == dates" :title="entry.title" :category="entry.category" :id="entry.id" :date="entry.date" :rating="entry.rating" :content="entry.content"></Single>
        </div>
    </div>
</template>
<style lang="css" scoped>
template{
    color: white;
}
.entriess{
    padding: 20px
}
h2{
    font-family: 'Courier New', Courier, monospace;
    font-size: 18px;
}
</style>