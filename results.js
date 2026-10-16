// 在这里填写每组视频的编辑 prompt，保存并刷新页面即可。
// prompt 为空时，页面会显示预留文字 “Your editing prompt here.”。
// 用 “原 prompt → 编辑后的 prompt” 格式，自动将变化前的词标橘色、变化后的词标红色。
// 单句 prompt 可加 promptColor: "orange"，将整句显示为橘色。
// 添加 case 时可复制一项；同一个原视频的不同编辑也可以各写一项。
window.EDIT_RESULTS = [
  { id: "01", prompt: "A cow in a field→ A wolf in a field", original: "demos/more_results/1/raw.mp4", edited: "demos/more_results/1/edit.mp4", originalPoster: "assets/posters/case-1-raw.jpg", editedPoster: "assets/posters/case-1-edit.jpg" },
  { id: "02", prompt: "A train is traveling on a sunny day → A train is traveling on a snowy weather", original: "demos/more_results/2/raw.mp4", edited: "demos/more_results/2/edit.mp4", originalPoster: "assets/posters/case-2-raw.jpg", editedPoster: "assets/posters/case-2-edit.jpg" },
  { id: "03", prompt: "A white flamingo → A red flamingo", original: "demos/more_results/3/raw.mp4", edited: "demos/more_results/3/edit.mp4", originalPoster: "assets/posters/case-3-raw.jpg", editedPoster: "assets/posters/case-3-edit.jpg" },
  { id: "04", prompt: "Van Gogh portrait", promptColor: "orange", original: "demos/more_results/4/raw.mp4", edited: "demos/more_results/4/edit.mp4", originalPoster: "assets/posters/case-4-raw.jpg", editedPoster: "assets/posters/case-4-edit.jpg" },
  { id: "05", prompt: "A silver jeep is driving on the road → A orange jeep is driving on the road", original: "demos/more_results/5/raw.mp4", edited: "demos/more_results/5/edit.mp4", originalPoster: "assets/posters/case-5-raw.jpg", editedPoster: "assets/posters/case-5-edit.jpg" },
  { id: "06", prompt: "A yellow clothing person is skiing → A green clothing person is skiing", original: "demos/more_results/6/raw.mp4", edited: "demos/more_results/6/edit.mp4", originalPoster: "assets/posters/case-6-raw.jpg", editedPoster: "assets/posters/case-6-edit.jpg" },
];
