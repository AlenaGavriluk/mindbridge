package com.mindbridge.core.domains.post;

import com.mindbridge.core.domains.post.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("post")
@Validated
public class PostController {

	private final PostService postService;

	@Autowired
	public PostController(PostService postService) {
		this.postService = postService;
	}

	@GetMapping("/{id}")
	public PostDetailsDto getPost(@PathVariable UUID id) {
		return postService.getPostById(id);
	}

	@PostMapping("/create")
	public UUID createPost(@RequestBody CreatePostDto post) {
		return postService.savePost(post);
	}

	@PutMapping("/edit")
	public UUID editPost(@RequestBody EditPostDto editPostDto) {
		return postService.editPost(editPostDto);
	}

	@GetMapping("/all")
	public List<PostsListDetailsDto> getAllPosts(@RequestParam(defaultValue = "0") Integer from,
			@RequestParam(defaultValue = "10") Integer count) {
		return postService.getAllPosts(from, count);
	}

	@GetMapping("/hots")
	public List<PostsListDetailsDto> getHotPosts(@RequestParam(defaultValue = "0") Integer from,
												 @RequestParam(defaultValue = "10") Integer count) {
		return postService.getHotPosts(from, count);
	}

	@GetMapping("/bests")
	public List<PostsListDetailsDto> getBestPosts(@RequestParam(defaultValue = "0") Integer from,
												 @RequestParam(defaultValue = "10") Integer count) {
		return postService.getBestPosts(from, count);
	}

	@GetMapping("/tag/{tags}")
	public List<PostsListDetailsDto> getPostsByTagName(@PathVariable String tags,
													   @RequestParam(defaultValue = "0") Integer from,
												  @RequestParam(defaultValue = "10") Integer count) {
		return postService.getPostsByTags(tags, from, count);
	}

	@GetMapping("/title/{id}")
	public String getTitle(@PathVariable UUID id) {
		return postService.getTitleOfPost(id);
	}

	@GetMapping("/drafts/{id}")
	public List<DraftsListDto> getAllDrafts(@PathVariable UUID id) {
		return postService.getAllDrafts(id);
	}

}
