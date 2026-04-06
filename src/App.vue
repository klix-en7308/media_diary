<script setup>
import { ref, onMounted, computed, watch } from "vue";


const entries = ref([]);


let firstID = 0;

let contentstate = ref('entries');
let currentcomp = computed(()=>{return contentstate.value == 'entries'? 'entries' : contentstate.value == 'form' ? 'entryform' : 'currentlyviewing'});
console.log(currentcomp);

let viewedentry = {};



let months = computed(()=>{
  let result = []
  dates.value.forEach(date =>{
    if(!result.includes(new Date(date).toLocaleString('default', { month: 'long' }))){
      result.push(new Date(date).toLocaleString('default', { month: 'long' }))
    }
  })
  return result
})

let years = computed(()=>{
  let result = []
  dates.value.forEach(date =>{
    if(!result.includes(new Date(date).getFullYear().toString())){
      result.push(new Date(date).getFullYear().toString())
    }
  })
  return result
})

const changeVisual = (entrysubmission)=>{
  console.log(currentcomp.value)
  firstID += 1;
  entries.value.push({
    id: firstID,
    title: entrysubmission.title,
    category: entrysubmission.category,
    date: entrysubmission.date,
    rating: entrysubmission.rating,
    content: entrysubmission.content
  })
  contentstate.value = 'entries';
}

const updateEntries = (entrieee)=>{entries.value = entrieee;}

const viewEntry = (id) => {
  viewedentry = entries.value.find(entry => entry.id == id);
  contentstate.value = 'viewingentry';
  console.log(currentcomp.value)
}

const goBack = ()=>{
  contentstate.value = 'entries'
}

// sorting stuff
const pickedMonth = ref('all');
const pickedYear = ref('all');

const pickedCategory = ref('all');
let filterbyCategory = computed(()=>{
  return entries.value.filter(entry => {
    if (pickedCategory.value == 'all'){
      return true
    } else {
      console.log(pickedCategory.value, entry.category)
      return pickedCategory.value === entry.category
    }
  })
})

let dates = computed(()=>{
  
    let result = []
    filterbyCategory.value.forEach(entri => {
      if (!result.includes(entri.date.toISOString().slice(0, 10))) {
        result.push(entri.date.toISOString().slice(0, 10))
      }
    })
    return result
  
})

let filteredEntries = computed(() => {
  return filterbyCategory.value.filter(entry => {
    const date = new Date(entry.date)

    const matchesMonth =
      pickedMonth.value === 'all' || !pickedMonth.value ||  date.toLocaleString('default', { month: 'long' }) === pickedMonth.value

    const matchesYear =
      pickedYear.value === 'all' || !pickedYear.value || date.getFullYear().toString() === pickedYear.value

    return matchesMonth && matchesYear
  })
})

let filteredDates = computed(() => {
  return dates.value.filter(dater => {
    const date = new Date(dater)

    const matchesMonth =
      pickedMonth.value == "all" || !pickedMonth.value ||
      date.toLocaleString('default', { month: 'long' }) === pickedMonth.value

    const matchesYear =
      pickedYear.value == "all" || !pickedYear.value ||
      date.getFullYear().toString() === pickedYear.value

    return matchesMonth && matchesYear
  })
})


</script>

<template>
  <main class="app">
    <div class="grid">
      <div class="top">
        kalixen's media diary
      </div>
      <div class="left">
        <div>
          <select v-model="pickedMonth">
          <option selected="">all</option>
          <option v-for="month in months">
            {{ month }}
          </option>
        </select>
        <select v-model="pickedYear">
          <option selected>all</option>
          <option v-for="year in years">
            {{ year }}
          </option>
        </select>
        </div>
        <div>
          Category: 
          <div class="radios">
            <input type="radio" v-model="pickedCategory" name="radioo" id="all" value="all" checked />
            <label for="all">all</label>
          </div>
          <div class="radios">
            <input type="radio" v-model="pickedCategory" name="radioo" id="games" value="games" />
            <label for="games">Games</label>
          </div>
          <div class="radios">
            <input type="radio" v-model="pickedCategory" name="radioo" id="music" value="music" />
            <label for="music">Music</label>
          </div>
          <div class="radios">
            <input type="radio" v-model="pickedCategory" name="radioo" id="food" value="food" />
            <label for="food">Food</label>
          </div>
          <div class="radios">
            <input type="radio" v-model="pickedCategory" name="radioo" id="books" value="books" />
            <label for="books">Books</label>
          </div>
          <div class="radios">
            <input type="radio" v-model="pickedCategory" name="radioo" id="movies" value="movies" />
            <label for="movies">Movies</label>
          </div>
          <div class="radios">
            <input type="radio" v-model="pickedCategory" name="radioo" id="tv-show" value="tv-show" />
            <label for="tv-show">Tv Shows</label>
          </div>
        </div>
      </div>
      <button class="add" @click="contentstate = 'form'">
        + add an entry
      </button>
      <div class="right">
        <component :is="currentcomp" 
          @update-entries="updateEntries" 
          @submit-form="changeVisual" 
          @view-entry="viewEntry"
          @go-back = "goBack"
          :entries="filteredEntries" 
          :dates="filteredDates" 
          :entryviewing="viewedentry"
        ></component>
      </div>
    </div>
  </main>
</template>

<style scoped>
.radios{
  color: white
}
</style>