<template>
    <div class="modal-overlay">
      <div class="modal-content glass-panel">
        <h3>Select Question Type</h3>
        <div class="action-buttons">
          <button @click="$emit('select', 'mcq')" class="glass-button success-primary mcq">Multiple Choice</button>
        <button @click="$emit('select', 'input')" class="glass-button success text-input">Text Input</button>
        <button @click="$emit('close')" class="glass-button danger cancel">Cancel</button>
        </div>
     
      </div>
    </div>
  </template>
  