const rabbitModel = {
    size: 4,
    fillStyle: '#999999',
    states: {
        'idle': {
            duration: 5000,
            animation: 'idle',
            behaviour: function() {
                // Move around a bit at random.
            }
        },
        'panic': {
            duration: 10000,
            animation: 'running',
            behaviour: function() {
                // Move far away.
            }
        }
    }
};

export default rabbitModel;
