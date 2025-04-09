import { ref } from 'vue';

export function useQuizBuilder() {
  const quiz = ref({
    title: '',
    description: '',
    questions: []
  });

  const addQuestion = () => {
    quiz.value.questions.push({
      text: '',
      type: 'mcq',
      options: ['', ''],
      correctAnswer: ''
    });
  };

  const removeQuestion = (index) => {
    quiz.value.questions.splice(index, 1);
  };

  const addOption = (index) => {
    quiz.value.questions[index].options.push('');
  };

  const removeOption = (qIndex, oIndex) => {
    quiz.value.questions[qIndex].options.splice(oIndex, 1);
  };

  const publishQuiz = () => {
    console.log('Publishing quiz:', quiz.value);
    alert('Quiz published!');
  };

  return {
    quiz,
    addQuestion,
    removeQuestion,
    addOption,
    removeOption,
    publishQuiz
  };
}
