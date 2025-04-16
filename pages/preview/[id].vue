<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const quiz = ref(
  null
)

onMounted(() => {
if (process.client) {
  const id = route.params.id
  const stored = localStorage.getItem('quizzes')
  if (stored && id) {
    const allQuizzes = JSON.parse(stored)
    quiz.value = allQuizzes.find(q => q.id === id)
  }
}
})

</script>

   <template>
  <div v-if="quiz">
   <QuizPreviewPanel :quiz="quiz" />
    
  </div>
  <div v-else>
    <p>Loading quiz...</p>
  </div>
</template>

 
  
 