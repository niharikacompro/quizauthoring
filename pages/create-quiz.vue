<template>
  <QuizCreator :quizId="quizId" />
</template>
<script setup>
import { useRoute } from "nuxt/app";

const route = useRoute();
const quizId = route.query.id;
console.log(quizId);
</script>
