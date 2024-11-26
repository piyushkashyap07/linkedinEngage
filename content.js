// checking 
let commentInserted = false; // Tracks if the comment has already been inserted
let apiCallInProgress = false; // Tracks if an API call is already in progress

// Define the event listener function separately
function handleCommentButtonClick(event) {
    const commentBtn = event.target.closest("button[role='button'][aria-label='Comment']");
    if (commentBtn) {
        const postContainer = commentBtn.closest(".fie-impression-container");

        if (postContainer) {
            let postText = "";

            // Reset the commentInserted flag when a new "Comment" button is clicked
            commentInserted = false;

            // Extract main post text
            const postTextElement = postContainer.querySelector(".break-words");
            if (postTextElement) {
                postText += postTextElement.innerText.trim();
            }

            // Extract reposted content
            const repostContainer = postContainer.querySelector(".update-components-mini-update-v2.feed-shared-update-v2__update-content-wrapper.artdeco-card");
            if (repostContainer) {
                const repostTextElement = repostContainer.querySelector(".break-words");
                if (repostTextElement) {
                    postText += "\n\nReposted Content:\n" + repostTextElement.innerText.trim();
                }
            }

            // Avoid making another API call if one is already in progress
            if (postText && !apiCallInProgress) {
                apiCallInProgress = true; // Set the flag to indicate API call is in progress
                document.removeEventListener('click', handleCommentButtonClick); // Temporarily remove the event listener

                // Call the FastAPI backend
                fetch("http://localhost:8000/generate_comment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text: postText })
                })
                    .then(response => response.json())
                    .then(data => {
                        const generatedComment = data.comment;
                        console.log("Generated Comment:", generatedComment);

                        // Click the comment button to focus the comment editor
                        commentBtn.click();

                        // Give a slight delay to ensure the editor is focused
                        setTimeout(() => {
                            // Get the active comment box (where the cursor is)
                            const activeCommentBox = document.activeElement;

                            if (
                                activeCommentBox &&
                                activeCommentBox.getAttribute("role") === "textbox" &&
                                !commentInserted &&
                                activeCommentBox.innerText.trim() === ""
                            ) {
                                // Insert text at the cursor position
                                document.execCommand('insertText', false, generatedComment);

                                // Mark that the comment has been inserted
                                commentInserted = true;

                                // Trigger an input event to notify LinkedIn of the change
                                activeCommentBox.dispatchEvent(new Event('input', { bubbles: true }));
                            } else {
                                console.error("No active comment box found, editor not focused, or text already inserted.");
                            }

                            // Reset flags and re-attach event listener after processing
                            apiCallInProgress = false;
                            document.addEventListener('click', handleCommentButtonClick); // Re-attach the event listener
                        }, 500);  // Adjust delay if needed
                    })
                    .catch(error => {
                        console.error("Error generating comment:", error);
                        // Reset flags and re-attach event listener on error
                        apiCallInProgress = false;
                        document.addEventListener('click', handleCommentButtonClick); // Re-attach the event listener
                    });
            }
        }
    }
}

// Attach the click event listener
document.addEventListener('click', handleCommentButtonClick);
