package com.mindbridge.core.domains.tag;

import com.mindbridge.data.domains.tag.TagRepository;
import com.mindbridge.data.domains.tag.dto.TagDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

	private final TagRepository tagRepository;

	public TagService(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	public List<TagDto> getTags() {
		return tagRepository.findAll().stream().map(TagDto::fromEntity).collect(Collectors.toList());
	}

	public List<TagDto> getPopularTags() {
		return tagRepository.findPopularTags().stream().map(TagDto::fromEntity).collect(Collectors.toList());
	}

}
