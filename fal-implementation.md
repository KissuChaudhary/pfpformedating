https://fal.ai/models/fal-ai/bytedance/seedream/v4.5/edit/llms.txt

# Bytedance

> A new-generation image creation model ByteDance, Seedream 4.5 integrates image generation and image editing capabilities into a single, unified architecture.



## Overview

- **Endpoint**: `https://fal.run/fal-ai/bytedance/seedream/v4.5/edit`
- **Model ID**: `fal-ai/bytedance/seedream/v4.5/edit`
- **Category**: image-to-image
- **Kind**: inference
**Tags**: stylized, transform



## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.


### Input Schema

The API accepts the following input parameters:


- **`prompt`** (`string`, _required_):
  The text prompt used to edit the image
  - Examples: "Replace the product in Figure 1 with that in Figure 2. For the title copy the text in Figure 3 to the top of the screen, the title should have a clear contrast with the background but not be overly eye-catching."

- **`image_size`** (`ImageSize | Enum`, _optional_):
  The size of the generated image. Width and height must be between 1920 and 4096, or total number of pixels must be between 2560*1440 and 4096*4096.
  - Default: `{"height":2048,"width":2048}`
  - One of: ImageSize | Enum
  - Examples: "auto_4K"

- **`num_images`** (`integer`, _optional_):
  Number of separate model generations to be run with the prompt. Default value: `1`
  - Default: `1`
  - Range: `1` to `6`

- **`max_images`** (`integer`, _optional_):
  If set to a number greater than one, enables multi-image generation. The model will potentially return up to `max_images` images every generation, and in total, `num_images` generations will be carried out. In total, the number of images generated will be between `num_images` and `max_images*num_images`. The total number of images (image inputs + image outputs) must not exceed 15 Default value: `1`
  - Default: `1`
  - Range: `1` to `6`

- **`seed`** (`integer`, _optional_):
  Random seed to control the stochasticity of image generation.

- **`sync_mode`** (`boolean`, _optional_):
  If `True`, the media will be returned as a data URI and the output data won't be available in the request history.
  - Default: `false`

- **`enable_safety_checker`** (`boolean`, _optional_):
  If set to true, the safety checker will be enabled. Default value: `true`
  - Default: `true`
  - Examples: true

- **`image_urls`** (`list<string>`, _required_):
  List of URLs of input images for editing. Presently, up to 10 image inputs are allowed. If over 10 images are sent, only the last 10 will be used.
  - Array of string
  - Examples: ["https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_1.png","https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_2.png","https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_3.png"]



**Required Parameters Example**:

```json
{
  "prompt": "Replace the product in Figure 1 with that in Figure 2. For the title copy the text in Figure 3 to the top of the screen, the title should have a clear contrast with the background but not be overly eye-catching.",
  "image_urls": [
    "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_1.png",
    "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_2.png",
    "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_3.png"
  ]
}
```

**Full Example**:

```json
{
  "prompt": "Replace the product in Figure 1 with that in Figure 2. For the title copy the text in Figure 3 to the top of the screen, the title should have a clear contrast with the background but not be overly eye-catching.",
  "image_size": "auto_4K",
  "num_images": 1,
  "max_images": 1,
  "enable_safety_checker": true,
  "image_urls": [
    "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_1.png",
    "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_2.png",
    "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_3.png"
  ]
}
```
for javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/bytedance/seedream/v4.5/edit", {
  input: {
    prompt: "Replace the product in Figure 1 with that in Figure 2. For the title copy the text in Figure 3 to the top of the screen, the title should have a clear contrast with the background but not be overly eye-catching.",
    image_size: "portrait_4_3",
    num_images: 1,
    max_images: 1,
    enable_safety_checker: true,
    image_urls: ["https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_1.png", "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_2.png", "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_3.png"]
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);



## image_size ImageSize | Enum
The size of the generated image. Width and height must be between 1920 and 4096, or total number of pixels must be between 25601440 and 40964096.

Possible enum values: square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9, auto_2K, auto_4K

Note: For custom image sizes, you can pass the width and height as an object:

"image_size": {
  "width": 1280,
  "height": 720
}


### Output Schema

The API returns the following output format:

- **`images`** (`list<Image>`, _required_):
  Generated images
  - Array of Image
  - Examples: [{"url":"https://storage.googleapis.com/falserverless/example_outputs/seedreamv45/seedream_v45_edit_output.png"}]



**Example Response**:

```json
{
  "images": [
    {
      "url": "https://storage.googleapis.com/falserverless/example_outputs/seedreamv45/seedream_v45_edit_output.png"
    }
  ]
}
```


## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/bytedance/seedream/v4.5/edit \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "Replace the product in Figure 1 with that in Figure 2. For the title copy the text in Figure 3 to the top of the screen, the title should have a clear contrast with the background but not be overly eye-catching.",
     "image_urls": [
       "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_1.png",
       "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_2.png",
       "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_3.png"
     ]
   }'
```

### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/bytedance/seedream/v4.5/edit",
    arguments={
        "prompt": "Replace the product in Figure 1 with that in Figure 2. For the title copy the text in Figure 3 to the top of the screen, the title should have a clear contrast with the background but not be overly eye-catching.",
        "image_urls": ["https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_1.png", "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_2.png", "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_3.png"]
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/bytedance/seedream/v4.5/edit", {
  input: {
    prompt: "Replace the product in Figure 1 with that in Figure 2. For the title copy the text in Figure 3 to the top of the screen, the title should have a clear contrast with the background but not be overly eye-catching.",
    image_urls: ["https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_1.png", "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_2.png", "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_3.png"]
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```


## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/bytedance/seedream/v4.5/edit)
- [API Documentation](https://fal.ai/models/fal-ai/bytedance/seedream/v4.5/edit/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/bytedance/seedream/v4.5/edit)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)


3. Queue
#
Long-running requests
For long-running requests, such as training jobs or models with slower inference times, it is recommended to check the Queue status and rely on Webhooks instead of blocking while waiting for the result.

Submit a request
#
The client API provides a convenient way to submit requests to the model.


import { fal } from "@fal-ai/client";

const { request_id } = await fal.queue.submit("fal-ai/bytedance/seedream/v4.5/edit", {
  input: {
    prompt: "Replace the product in Figure 1 with that in Figure 2. For the title copy the text in Figure 3 to the top of the screen, the title should have a clear contrast with the background but not be overly eye-catching.",
    image_urls: ["https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_1.png", "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_2.png", "https://storage.googleapis.com/falserverless/example_inputs/seedreamv45/seedream_v45_edit_input_3.png"]
  },
  webhookUrl: "https://optional.webhook.url/for/results",
});
Fetch request status
#
You can fetch the status of a request to check if it is completed or still in progress.


import { fal } from "@fal-ai/client";

const status = await fal.queue.status("fal-ai/bytedance/seedream/v4.5/edit", {
  requestId: "764cabcf-b745-4b3e-ae38-1200304cf45b",
  logs: true,
});
Get the result
#
Once the request is completed, you can fetch the result. See the Output Schema for the expected result format.


import { fal } from "@fal-ai/client";

const result = await fal.queue.result("fal-ai/bytedance/seedream/v4.5/edit", {
  requestId: "764cabcf-b745-4b3e-ae38-1200304cf45b"
});
console.log(result.data);
console.log(result.requestId);