<script setup lang="ts">
	const size= ref(20)
	const start_index= ref(size.value/2)
	const end_index= ref(size.value/2)
	const drawing_mode= ref(0)
	const reloading_grid= ref(false)
	const paused = ref(false)
</script>

<template>
	
	<div class="rootContainer">
		<ModeBar :mode="drawing_mode"
			:paused="paused"
			@change_mode="mode => drawing_mode= mode"
			@pause="_ => paused= true"
			@play=" _=> paused= false"
			@reload="_ => {
				reloading_grid = true
				start_index= size/2
				end_index= size/2
			}"
		/>
		
		<SFSlots 
			:size="size" 
			:type="false" 
			:start-index="start_index" 
			@selected="index => start_index= index"
		/>

		<div class="pixelEditorContainer">
			<PixelGrid 
				:size="size" 
				:maze-start-index="start_index" 
				:maze-end-index="end_index" 
				:drawing_mode="drawing_mode"
				:reloading="reloading_grid"
				:paused="paused"
				@doneReloading ="_ => reloading_grid= false"
			/>
				
		</div>

		<SFSlots 
			:size="size" 
			:type="true" 
			:start-index="end_index" 
			@selected="index => end_index= index"
		/>
	</div>
</template>

<style>
.rootContainer {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgb(246, 244, 229);
}

.pixelEditorContainer {
	aspect-ratio: 1;
	height: 80%;
	margin: 0;
}
body {
	margin: 0;
}
</style>