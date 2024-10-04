$(document).ready(function () {
    const audioPlayer = $('#audio-player')[0];
    let isPlaying = false;
    let currentTrackIndex = 0;

    const tracks = [
        { file: 'https://www.youtube.com/watch?v=aGOOXuZaM1Q', title: 'Song 1', artist: 'Artist 1' },
        { file: 'https://www.example.com/path/to/song2.mp3', title: 'Song 2', artist: 'Artist 2' },
        { file: 'https://www.example.com/path/to/song3.mp3', title: 'Song 3', artist: 'Artist 3' }
    ];

    function loadTrack(index) {
        const track = tracks[index];
        $('#audio-player').attr('src', track.file);
        $('#track-title').text(track.title);
        $('#track-artist').text(track.artist);
        $('#track-list .list-group-item').removeClass('active');
        $(`#track-list .list-group-item:eq(${index})`).addClass('active');
    }

    function playTrack() {
        audioPlayer.play();
        $('#play-btn i').removeClass('fa-play').addClass('fa-pause');
        isPlaying = true;
    }

    function pauseTrack() {
        audioPlayer.pause();
        $('#play-btn i').removeClass('fa-pause').addClass('fa-play');
        isPlaying = false;
    }

    $('#play-btn').click(function () {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    $('#prev-btn').click(function () {
        currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : tracks.length - 1;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    $('#next-btn').click(function () {
        currentTrackIndex = (currentTrackIndex < tracks.length - 1) ? currentTrackIndex + 1 : 0;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    $('#volume-control').on('input', function () {
        audioPlayer.volume = $(this).val();
    });

    $('#progress-bar').on('input', function () {
        audioPlayer.currentTime = (audioPlayer.duration * $(this).val()) / 100;
    });

    $('#audio-player').on('timeupdate', function () {
        $('#progress-bar').val((audioPlayer.currentTime / audioPlayer.duration) * 100);
    });

    $('#track-list .list-group-item').click(function () {
        currentTrackIndex = $(this).index();
        loadTrack(currentTrackIndex);
        playTrack();
    });

    // Load the initial track
    loadTrack(currentTrackIndex);
});
