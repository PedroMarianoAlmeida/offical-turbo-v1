import { Result } from "@/app/dashboard/new-image/step4/result";

export default async function Step4Loading() {
  return (
    <Result
      finalPrompt="Donec dapibus sapien eu nulla rutrum, quis egestas dolor ultrices. Vestibulum placerat massa ex, ac aliquam turpis pretium nec. Suspendisse potenti. Pellentesque nec eros vulputate, feugiat dui sit amet, pretium lacus. Aliquam odio nunc, placerat quis nisi vitae, molestie pharetra urna. Nulla tristique posuere pharetra. Vivamus viverra, justo et ullamcorper ultrices, leo lacus fringilla orci, ac lobortis augue sapien sed elit. In nisi est, vestibulum at facilisis ut, lacinia ultricies quam. Quisque condimentum eros hendrerit elit tempor sodales. Aenean consectetur sollicitudin odio, at placerat metus elementum et. Praesent vitae dolor sed nisi sagittis luctus ut quis dolor. Maecenas eu tellus euismod, interdum tellus nec, porttitor urna. Aenean eleifend mauris at est gravida, in molestie neque laoreet. Mauris aliquam erat non risus ultricies elementum."
      finalSrc="/mock/betterimage1.webp"
      originalPrompt="Original prompt from step 1"
      originalSrc="/mock/betterimage2.webp"
      id="1"
      loading
    />
  );
}
