package com.mindbridge.core.domains.favourite;

import com.mindbridge.core.domains.favourite.dto.CreateFavouriteDto;
import com.mindbridge.core.domains.post.dto.PostsListDetailsDto;
import com.mindbridge.data.domains.favorite.model.Favorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("favourite")
@Validated
public class FavouriteController {

	private final FavouriteService favouriteService;

	@Autowired
	public FavouriteController(FavouriteService favouriteService) {
		this.favouriteService = favouriteService;
	}

	@GetMapping("/{id}")
	public List<PostsListDetailsDto> getAllFavourite(@PathVariable UUID id, @RequestParam(defaultValue = "0") Integer from,
													 @RequestParam(defaultValue = "10") Integer count) {
		return favouriteService.getFavouritesPostByUserId(id, from, count);
	}

	@PostMapping("/save")
	public UUID saveFavouritePost(@RequestBody CreateFavouriteDto favouriteDto) {
		return favouriteService.saveFavourite(favouriteDto);
	}

	@DeleteMapping("/delete/{id}")
	public UUID deleteFavouritePosts(@PathVariable UUID id) {
		return favouriteService.deleteFavouritePosts(id);
	}
}
