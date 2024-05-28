import { ref } from 'vue';

export const eventBus = ref(new Map());

export const emit = (event, ...args) => {
  const handlers = eventBus.value.get(event);
  if (handlers) {
    handlers.forEach(handler => handler(...args));
  }
};

export const on = (event, handler) => {
  if (!eventBus.value.has(event)) {
    eventBus.value.set(event, []);
  }
  eventBus.value.get(event).push(handler);
};
