<script setup>
import { ref, onMounted, computed, watch } from "vue";


const entries = ref([]);


let firstID = ref(0);

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
  entries.value.push({
    id: crypto.randomUUID(),
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

// how to download aaa

const downloadData = () => {
  const blob = new Blob([JSON.stringify(entries.value)], {type: 'application/json'});
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json';
  link.click();
  window.URL.revokeObjectURL(url);
}

const uploadData = (ev) => {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const saved = JSON.parse(e.target.result)

      entries.value = saved.map(entry => ({
        ...entry,
        date: new Date(entry.date) 
      }))
    } catch (error) {
      console.error('Invalid JSON file', error);
    }
  };
  reader.readAsText(file);
}

const triggerInput = ()=>{
  document.getElementById("fileupload").click();
}


watch(entries, newVal=>{
  localStorage.setItem('entries', JSON.stringify(newVal))
}, {deep: true})

watch(firstID, newVal=>{
  localStorage.setItem('firstID', newVal)
})
onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('entries')) || []

  entries.value = saved.map(entry => ({
    ...entry,
    date: new Date(entry.date) 
  }))
  console.log(entries.value)
})

</script>

<template>
  <main class="app">
    <div class="grid">
      <div class="top">
        media diary
      </div>
      <div class="left">
        <div class="rightcontent">
        <div class="select-row">
          <div>
            Month
            <select v-model="pickedMonth">
            <option selected="">all</option>
            <option v-for="month in months">
              {{ month }}
            </option>
            </select>
          </div>
          <div>
            Year<select v-model="pickedYear">
            <option selected>all</option>
            <option v-for="year in years">
              {{ year }}
            </option>
            </select>
          </div>
          
        </div>
        <div class="categoryarea">
          <div class="categort">Category: </div>
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
        <button class="add" @click="contentstate = 'form'">
        + add an entry
        </button>
        <div class="select-row">
          <div><button class="add" @click="downloadData">save</button></div>
          <div><button class="add" @click="triggerInput">upload</button></div>
        </div>
        <div><input class="add" @change="uploadData" type="file" accept=".json" id="fileupload"></input></div>
        </div>
      </div>
      
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

      <div class="footer">
        made by kalixen - 04.2026
      </div>
    </div>
  </main>
</template>

<style scoped>
.radios{
  color: white
}
input[type="file"]{
  display: none;
}
</style>