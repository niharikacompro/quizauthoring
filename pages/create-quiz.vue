<template>
   <QuizCreator :quizId="quizId"/>
  </template>
<script setup>
import { useRoute } from 'nuxt/app';


const route = useRoute();
const quizId = route.query.id;
console.log(quizId);
</script>
 
  <style>
 .app-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.quiz-creator-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 20px;
}
.toggle-radio-button.selected {
  background-color: #4caf50;
  color: white;
}

.creation-panel, .preview-panel {
  flex: 1;
  padding: 20px;
  margin: 25px;
}
.quiz-title ,.quiz-description{
  margin:5px;
}

.creation-panel {
  display: flex;
  flex-direction: column;
  
  gap: 20px;
}

/* Glassmorphism Styles */
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
 
}

.glass-input {
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 8px;
  padding: 12px 15px;
  width: 100%;
  box-shadow: 
    inset 3px 3px 5px rgba(163, 177, 198, 0.3),
    inset -3px -3px 5px rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.glass-input:focus {
  outline: none;
  box-shadow: 
    inset 5px 5px 8px rgba(163, 177, 198, 0.4),
    inset -5px -5px 8px rgba(255, 255, 255, 0.9);
}

.glass-button {
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    4px 4px 8px rgba(163, 177, 198, 0.6),
    -4px -4px 8px rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.7);
}

.glass-button:hover {
  transform: translateY(-2px);
  box-shadow: 
    6px 6px 10px rgba(163, 177, 198, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.8);
}

.glass-button:active {
  transform: translateY(0);
  box-shadow: 
    2px 2px 5px rgba(163, 177, 198, 0.6),
    -2px -2px 5px rgba(255, 255, 255, 0.7);
}
.action-buttons{
  display: flex;
  gap:20px;
   margin:20px;
}


/* Button Variants */
.primary {
  background: rgba(0, 123, 255, 0.7);
  color: white;
}
.success-primary{
  background: #058746;
  color:white;
}

.success {
  background: #35bb66;
  color: white;
}

.danger {
  background: rgba(220, 53, 69, 0.7);
  color: white;
}

.secondary {
  background: rgba(108, 117, 125, 0.7);
  color: white;
}

.small {
  padding: 5px 10px;
  font-size: 0.8rem;
}

/* Form Elements */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

textarea.glass-input {
  min-height: 80px;
  resize: vertical;
}

/* Question Styling */
.question-container {
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.options-section {
  margin-top: 15px;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.radio-input {
  margin-left: 10px;
}

/* Preview Panel */
.preview-panel {
  position: sticky;
  top: 20px;
  height: fit-content;
  max-height: 90vh;
  overflow-y: auto;
}

.preview-title {
  color: #333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.preview-question {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.preview-question h4 {
  margin-bottom: 15px;
  color: #444;
}

.preview-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preview-option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-option label {
  cursor: pointer;
}

.empty-preview {
  text-align: center;
  color: #666;
  padding: 40px 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  padding: 30px;
  width: 400px;
  max-width: 90%;
}

.type-options {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

/* Responsive */
@media (max-width: 1024px) {
  .quiz-creator-container {
    flex-direction: column;
  }
  
  .preview-panel {
    position: static;
    margin-top: 30px;
  }
  .creation-panel, .preview-panel {
  flex: 1;
  padding: 20px;
}
.modal-close-button {
  position: absolute;
  top: 0.5rem;
   right :0;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #555;
  cursor: pointer;
  transition: color 0.3s ease;
}

.modal-close-button:hover {
  color: #ff4444;
}
}
</style>
  