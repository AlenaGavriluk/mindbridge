package com.mindbridge.core.domains.user;

import com.mindbridge.core.domains.post.dto.PostsHistoryListDto;
import com.mindbridge.core.domains.user.dto.UserDto;
import com.mindbridge.core.domains.user.dto.UserProfileDto;
import com.mindbridge.data.domains.follower.FollowerRepository;
import com.mindbridge.data.domains.post.PostRepository;
import com.mindbridge.core.exceptions.custom.EmailNotFoundException;
import com.mindbridge.core.security.PasswordConfig;
import com.mindbridge.core.security.auth.UserPrincipal;
import com.mindbridge.core.security.auth.dto.RegistrationRequest;
import com.mindbridge.data.domains.user.UserRepository;
import com.mindbridge.data.domains.user.model.User;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService implements UserDetailsService {

	private final UserRepository userRepository;

	private final FollowerRepository followerRepository;

	private final PostRepository postRepository;

	private final PasswordEncoder passwordEncoder;

	private final Random random = new Random();

	public static final String PHONE_REGEX = "^\\d{10}$";

	public static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z].{2})(?=.*[A-Z])(?=\\S+$).{8,40}$";

	@Lazy
	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			FollowerRepository followerRepository, PostRepository postRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new PasswordConfig().passwordEncoder();
		this.followerRepository = followerRepository;
		this.postRepository = postRepository;
	}

	public UserProfileDto getQuantityOfUsers(UUID userId) {
		var user = UserMapper.MAPPER.userToUserProfileDto(userRepository.findById(userId).orElseThrow());
		var posts = postRepository.getPostsByAuthorId(userId);
		user.setFollowersQuantity(followerRepository.countFollowerByFollowedId(userId));
		user.setDatesOfPosts(posts.stream().map(PostsHistoryListDto::fromEntity).collect(Collectors.toList()));
		user.setPostsQuantity(posts.size());
		user.setRating(random.nextInt(100));
		return user;
	}

	public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new EmailNotFoundException("User with email : " + email + " not found."));
		return new UserPrincipal(user);
	}

	public UserDto loadUserDtoByEmail(String email) throws UsernameNotFoundException {
		return userRepository.findByEmail(email).map(UserMapper.MAPPER::userToUserDto).get();
	}

	public void registerNewUserAccount(RegistrationRequest registrationRequest) {
		User user = new User();
		user.setFirstName(registrationRequest.getName());
		user.setLastName(registrationRequest.getSurname());
		user.setNickname(registrationRequest.getNickname());
		user.setEmail(registrationRequest.getEmail());
		user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
		user.setEmailVerified(false);
		userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
		User user = userRepository.findByNickname(nickname)
				.orElseThrow(() -> new EmailNotFoundException("User with nickname : " + nickname + " not found."));
		return new UserPrincipal(user);
	}

}
