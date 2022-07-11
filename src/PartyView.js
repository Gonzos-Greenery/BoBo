import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable, TouchableOpacity} from 'react-native';
import { Button, VStack, Stack, Label, Icon} from 'native-base';

const attendees = [{
    id: '1',
    name: 'David H',
    status: true,
    host: false
},
{
    id: '2',
    name: 'Alli',
    status: false,
    host: false
},
{
    id: '3',
    name: 'Lauren',
    status: false,
    host: false
},
{
    id: '4',
    name: 'Sam',
    status: true,
    host: true,
    address: '123 Main St, 12345',
    date: 'July 4, 2022'
}]

const movies = [
    {
        "link": "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
        "genres": [
            "['scifi', 'action', 'fantasy']"
        ],
        "id": "62c4833328dd2eb1a7f659cd"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/wi2TElUd5OI5uhcHlurPFWpoY26.jpg",
        "genres": [
            "['drama', 'documentation']"
        ],
        "id": "62c4833328dd2eb1a7f659d5"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/7MzvmgHRmhbJH1UZJhRCkAtxvEy.jpg",
        "genres": [
            "['drama', 'comedy']"
        ],
        "id": "62c4833328dd2eb1a7f659d9"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/b56XLbpDNzNVVckFekIVv5Ts0K5.jpg",
        "genres": [
            "['comedy', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f659dd"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        "genres": [
            "['scifi', 'action']"
        ],
        "id": "62c4833328dd2eb1a7f659df"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/8XYghKF0xkxp5A7QtK2F5vffdpZ.jpg",
        "genres": [
            "['thriller', 'horror', 'documentation', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f659e1"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/vPTZwlq1IC4o1DCsEZEl2uGljzm.jpg",
        "genres": [
            "['drama', 'thriller', 'european', 'crime']"
        ],
        "id": "62c4833328dd2eb1a7f659ed"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/quNvMJFtFtzjj9cfcnIr5MXtIDF.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f659f0"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['romance', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f659fc"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/3sLz2yv6vBDWqBbd8rdnNeoJ2kJ.jpg",
        "genres": [
            "['fantasy', 'scifi', 'animation', 'action', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65a05"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/eVPmbqzgIZDUxzOn1S9FDBYrlqq.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65a08"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65a12"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/piGZDwFW4urLYDWGiYJMrt6hdCS.jpg",
        "genres": [
            "['action', 'drama', 'fantasy', 'horror', 'thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65a15"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/3g1d5xUZbvzB0HxIdR9N4pB2wKA.jpg",
        "genres": [
            "['drama', 'european', 'history']"
        ],
        "id": "62c4833328dd2eb1a7f65a19"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/ue3hCG1kW5G8hRYZc3RjBzdXabb.jpg",
        "genres": [
            "['comedy', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65a1c"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65a22"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/rm1f70UT6SMYcM31hrM5Dl2tpWy.jpg",
        "genres": [
            "['drama', 'action', 'crime']"
        ],
        "id": "62c4833328dd2eb1a7f65a25"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65a27"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/ym7Kst6a4uodryxqbGOxmewF235.jpg",
        "genres": [
            "['animation', 'romance', 'comedy', 'family', 'fantasy']"
        ],
        "id": "62c4833328dd2eb1a7f65a2a"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/uxHAIj7PpVmsC5ws8GSAbN3iCpn.jpg",
        "genres": [
            "['thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65a2b"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/8maQvL6HhXIC0DXLByQ1AT1XKcQ.jpg",
        "genres": [
            "['documentation', 'comedy', 'horror']"
        ],
        "id": "62c4833328dd2eb1a7f65a30"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/3NIzyXkfylsjflRKSz8Fts3lXzm.jpg",
        "genres": [
            "['thriller', 'crime', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65a41"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/AbbXspMOwdvwWZgVN0nabZq03Ec.jpg",
        "genres": [
            "['comedy', 'animation', 'family', 'fantasy']"
        ],
        "id": "62c4833328dd2eb1a7f65a43"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/wXnGVeReqm7K31zcmGkU7bL0V7O.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65a48"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['romance', 'family', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65a4a"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/qvR2Qs42WHwCEcuwhQnterU3gVY.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65a51"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/xTswiejpI4atxGN7BgELizpV3o3.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65a53"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/sdOrTVnzKGMpKyrH2MbWcZUoSc1.jpg",
        "genres": [
            "['drama', 'war', 'action']"
        ],
        "id": "62c4833328dd2eb1a7f65a54"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65a56"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/l4RgYPZkLz915kUu7TqSamuBV9D.jpg",
        "genres": [
            "['comedy', 'documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65a5b"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/21bMe3DvLiVRJ1Y3uCl2St2Z59B.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65a5f"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/jNnxZxS8CDfQLQDYSm2il8RPvpI.jpg",
        "genres": [
            "['drama', 'thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65a64"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/5Y2a3isdO22b0ELsnwz0KoVGJ3h.jpg",
        "genres": [
            "['drama', 'thriller', 'crime']"
        ],
        "id": "62c4833328dd2eb1a7f65a67"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/9yvvxYuHrc5OEHeMAyEFmbkWQVo.jpg",
        "genres": [
            "['documentation', 'music']"
        ],
        "id": "62c4833328dd2eb1a7f65a6d"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/cjZQ20H30jDkyU1RTAtwu9RAXs9.jpg",
        "genres": [
            "['documentation', 'music']"
        ],
        "id": "62c4833328dd2eb1a7f65a73"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65a7c"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/35vwi9L8Dwo11GobEhPTLHxgnxs.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65a7e"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/8Ef25ocE4tyCuOexDwZBSNMqQ8s.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65a81"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/eWXh5VQOMflOJI5uz5DJlJHr4Po.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65a84"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['romance']"
        ],
        "id": "62c4833328dd2eb1a7f65a85"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/iFNri0fwn1WfCoxf3H3v1z8dCm4.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65a8f"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/4rHDzVp2BeadIiD0uPQpAWEuPfV.jpg",
        "genres": [
            "['drama', 'romance', 'comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65aae"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/iI4kkdtyRwDYaczwrSfirRkY2vu.jpg",
        "genres": [
            "['drama', 'fantasy']"
        ],
        "id": "62c4833328dd2eb1a7f65aaf"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/18RZ6X3rNezzDDn5hX4IaSzCyMx.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65ab6"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/fD4WnzQH0YrvqXXon9RDTnOVPUw.jpg",
        "genres": [
            "['comedy', 'european', 'music', 'romance', 'thriller', 'crime']"
        ],
        "id": "62c4833328dd2eb1a7f65ab7"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/pXHpNfsZXX50vCb7Z39coEJCIka.jpg",
        "genres": [
            "['animation', 'comedy', 'family']"
        ],
        "id": "62c4833328dd2eb1a7f65abc"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['family']"
        ],
        "id": "62c4833328dd2eb1a7f65abd"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/8cj0Q2uFfpTkCw4gMqqcTBpdoqF.jpg",
        "genres": [
            "['drama', 'european', 'romance']"
        ],
        "id": "62c4833328dd2eb1a7f65ad0"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/9sd1bqaoty1nJea8NYjrU5Yy118.jpg",
        "genres": [
            "['thriller', 'comedy', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65ad7"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/kxNU5BkmtWaqxqw6wCxYh2fFkg0.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65adf"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/8FhMJzFhuQXMl79myyMF9digCYP.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65ae0"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/l2xR8AHcGJc6kIhVoXquYE24f8F.jpg",
        "genres": [
            "['thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65ae3"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/xLkyM2Vt3yqlttnql02uXt0lemy.jpg",
        "genres": [
            "['animation', 'drama', 'family', 'fantasy']"
        ],
        "id": "62c4833328dd2eb1a7f65ae6"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/mTfy1ISZbEbFp9wyLUbq265qVoO.jpg",
        "genres": [
            "['scifi', 'western', 'animation', 'action', 'comedy', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65ae8"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/nV8qwZRQm360YvgAmrdg2oDekJw.jpg",
        "genres": [
            "['drama', 'thriller', 'crime']"
        ],
        "id": "62c4833328dd2eb1a7f65aec"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/g2YbTYKpY7N2yDSk7BfXZ18I5QV.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65aee"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/zL40soH0AYoBD5BVNu9U2B98ejD.jpg",
        "genres": [
            "['drama', 'comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65afb"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/jx77VNUHQwRoLfd1PPPhZe49UnM.jpg",
        "genres": [
            "['drama', 'documentation', 'sport']"
        ],
        "id": "62c4833328dd2eb1a7f65b04"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/wX5mm43aNxtaZaW9oKPYctvODgG.jpg",
        "genres": [
            "['drama', 'comedy', 'sport', 'documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65b07"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/5BjFLRyiN7NDhzI7Bo66sSXbm93.jpg",
        "genres": [
            "['documentation', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65b08"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/vtoEBoGvrSJuDPfQ3rPELqIcG5e.jpg",
        "genres": [
            "['documentation', 'music']"
        ],
        "id": "62c4833328dd2eb1a7f65b14"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/zJ1e7pmyJ8an6ZxhhjwVNvqHe7t.jpg",
        "genres": [
            "['drama', 'comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65b17"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/1Thyu0UorpClFHHpLt2d0h6k6Wf.jpg",
        "genres": [
            "['documentation', 'music', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65b1f"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/4RtWkqywkzxonlnGBwv4RpSw4Rb.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65b20"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/soB2loIIdB8COEsy3fyOrm5PaZ5.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65b27"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/lYHRhI400tVAbaMMm6WUi8qX6Ny.jpg",
        "genres": [
            "['comedy', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65b2f"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/fzBLxDQO42kA6xdcyQ0qYueLuVC.jpg",
        "genres": [
            "['comedy', 'drama', 'war']"
        ],
        "id": "62c4833328dd2eb1a7f65b37"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/3621WvCUWHYiXbO6ZXMxBSUxApe.jpg",
        "genres": [
            "['crime', 'thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65b3c"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/hbGiaHULqEKmEEGb61ko7erTeYG.jpg",
        "genres": [
            "['documentation', 'music', 'thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65b3f"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/rEviyDWNbAFmvvCPlkMRPAGUElG.jpg",
        "genres": [
            "['drama', 'sport']"
        ],
        "id": "62c4833328dd2eb1a7f65b40"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/yB5v6wRhIoZxlDvCFFCQhUNezDY.jpg",
        "genres": [
            "['drama', 'history', 'sport', 'action']"
        ],
        "id": "62c4833328dd2eb1a7f65b4e"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/zDUtJIr4lPeMnF7vXHyAqCXkR4s.jpg",
        "genres": [
            "['music', 'documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65b53"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/tkdeCwZhy9hzzVjZFjw0RPGWUIg.jpg",
        "genres": [
            "['drama', 'european', 'thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65b54"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/7toQEADfuKZmnfihtWJtjOut7pp.jpg",
        "genres": [
            "['thriller', 'drama', 'romance']"
        ],
        "id": "62c4833328dd2eb1a7f65b55"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/iXAUPTb8XNSf5B4zyUAEajz2vFu.jpg",
        "genres": [
            "['crime', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65b57"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/KowKEuyWziUtnCYicv6zhzTQIv.jpg",
        "genres": [
            "['thriller', 'crime', 'drama', 'action']"
        ],
        "id": "62c4833328dd2eb1a7f65b64"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/bHb7FFoWw8nkVMfdWL5l9WwGa6D.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65b65"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/d1VEnsFO7YcEc5gRqKXu2Bq2MMJ.jpg",
        "genres": [
            "['drama', 'thriller', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65b6f"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/r4F4tsU0Ajeh9ZYUkWOJSYmioj7.jpg",
        "genres": [
            "['comedy', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65b73"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/qQFfzSzKTLwdBG1BcMpWtbGgOLt.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65b7f"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/9q2HFVgCGoYKylvjgo5FJlRJhIl.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65b81"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/ArCY77ZQOrzW44OzPmYP99piiFW.jpg",
        "genres": [
            "['thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65b89"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['romance', 'thriller', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65b8d"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/4SVGyyEWu6VJXV36xmSK66kCdMR.jpg",
        "genres": [
            "['music', 'documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65b96"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/6cd4WtRLYqpnyo7k46KE7iB0tmF.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65bab"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/amdtSKEESxhst5Q2XOUvqdG3Q86.jpg",
        "genres": [
            "['documentation', 'family', 'drama', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65bae"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['documentation', 'music']"
        ],
        "id": "62c4833328dd2eb1a7f65bbd"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/tzlpjpLwSJUhbX9SjZbfHQdDja7.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65bc0"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/8dQmrGk0WRPiCwiiGdIxnY5s8Pc.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65bc2"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['comedy', 'drama', 'music', 'reality']"
        ],
        "id": "62c4833328dd2eb1a7f65be1"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/zMKatZ0c0NCoKzfizaCzVUcbKMf.jpg",
        "genres": [
            "['fantasy', 'scifi', 'animation', 'family']"
        ],
        "id": "62c4833328dd2eb1a7f65be3"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['comedy', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65bf0"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/tcshhi07IaZXjmlGGHH1gQly6o9.jpg",
        "genres": [
            "['drama', 'family', 'comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65bf2"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/fkqwXMuIO7OEoYrZG0G9IydCb9.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65c08"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/4Q1P44IPm9FyxBH4vmxM7pRgopP.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65c09"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/mz28CAPHvMWeQj6thVEdLkNXi1A.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65c0c"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65c19"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/kRs7kdlw06DVkxOVidWloqZ3HCw.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65c1a"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/wBaRZ3aHa7qoYTSY0ONbXrXYk4B.jpg",
        "genres": [
            "['romance', 'thriller', 'crime', 'action', 'drama', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65c25"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/bT3c4TSOP8vBmMoXZRDPTII6eDa.jpg",
        "genres": [
            "['documentation', 'comedy', 'history', 'romance']"
        ],
        "id": "62c4833328dd2eb1a7f65c2a"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/7NHdE6MSFtJrAau7LCyN1xCjVHq.jpg",
        "genres": [
            "['drama', 'crime', 'history']"
        ],
        "id": "62c4833328dd2eb1a7f65c38"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/r32zckH18PmbHzvo08gv41Atv8H.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65c39"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/zp5NrmYp80axIGiEiYPmm1CW6uH.jpg",
        "genres": [
            "['thriller', 'horror', 'action', 'crime', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65c3a"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/gNxZRjdT9scyeSmTuzGL6vUPSU5.jpg",
        "genres": [
            "['music']"
        ],
        "id": "62c4833328dd2eb1a7f65c43"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/gB3qe1x5NBgtkHqiqUl4LCn8HhT.jpg",
        "genres": [
            "['animation', 'documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65c46"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/meOxtPReugAl2Aq9gjKnSTn1orG.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65c4d"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/yFMhGIMqXdZZYG9pfnyC26bRD6z.jpg",
        "genres": [
            "['documentation', 'family']"
        ],
        "id": "62c4833328dd2eb1a7f65c63"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/gHb9UUow3j25sMCb3wDIZatfIg1.jpg",
        "genres": [
            "['drama', 'european', 'history']"
        ],
        "id": "62c4833328dd2eb1a7f65c68"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/72lbd0cE9d3o7Awb0FB59EbHTxs.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65c6e"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/5VBPRWW13OJoiLA6suLofnjLKou.jpg",
        "genres": [
            "['drama', 'thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65c72"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/95xmOun2qRUzbCvC9hecJulROhj.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65c7a"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/7UNi1pgylTLN2MLqqhTJ12b9Yt5.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65c81"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/mUuX6P7e0AeSe69xUZITUgWhljp.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65c9a"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/8mJMrrT4tkfZLMFvKQ0Hq6jlXbp.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65c9d"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/gP9pM94ATcZGfKQ3faKy0a3dVIi.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65ca4"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/1JOSMJfATuOgnPqw9mjKeuKy78M.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65caa"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65cae"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65cb6"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/3dmm0zq08GFrUlswetgaVirhMJo.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65cb7"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/ApbpMA0NT6RCIAmtevUZev8sYhe.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65cbb"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/fJJOs1iyrhKfZceANxoPxPwNGF1.jpg",
        "genres": [
            "['fantasy', 'family', 'animation']"
        ],
        "id": "62c4833328dd2eb1a7f65cc2"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/dDhXuKzGLz3mG8Uz5j06NAVv3cy.jpg",
        "genres": [
            "['animation', 'fantasy', 'action', 'romance', 'comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65cc3"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/4jeoPpAtyPWMavXRPSrMYhy3BpK.jpg",
        "genres": [
            "['thriller', 'documentation', 'crime', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65cc8"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['romance', 'action']"
        ],
        "id": "62c4833328dd2eb1a7f65ccf"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/mfWfW6DfD4oBTFmGAndaTkuPUO5.jpg",
        "genres": [
            "['drama', 'comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65cd4"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/tBeWcGiShKPmUnhP93to2cvxOjd.jpg",
        "genres": [
            "['family', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65cd8"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/34nSHYqmb7222tiqiuKqKJmZiQa.jpg",
        "genres": [
            "['comedy', 'family', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65cda"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/p50NI5jH3DHIhxGvOT8MUhufUMM.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65ce1"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/2Zs6vPeCEamSRokFoq8tBh9i4Aw.jpg",
        "genres": [
            "['thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65ce2"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/izuJ7cUhcihFnTpfsdSnkMCHsRQ.jpg",
        "genres": [
            "['crime', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65ce6"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/1A6c7hmS1pGWZ9OleB5l9PEMst6.jpg",
        "genres": [
            "['drama', 'romance']"
        ],
        "id": "62c4833328dd2eb1a7f65cf7"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/7NfDZwBPNxceuynFKXU2VkSsH6D.jpg",
        "genres": [
            "['drama', 'history', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65d00"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/pwP5zPHG5xMPQbs9JarjDD8icUl.jpg",
        "genres": [
            "['drama', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65d06"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/2qyTW8y0GR2LNgSbPUZfbbxXPyy.jpg",
        "genres": [
            "['comedy', 'drama', 'romance']"
        ],
        "id": "62c4833328dd2eb1a7f65d08"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/hBhpZjOA1G99FXdENq0zUwEEcR3.jpg",
        "genres": [
            "['drama', 'european', 'romance']"
        ],
        "id": "62c4833328dd2eb1a7f65d09"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/owAqV7DA3PPxqBYRDd3uH4sCLjA.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65d0c"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/mkb9Y5D4bo1bELq2JtomvmZ64XU.jpg",
        "genres": [
            "['drama', 'comedy', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65d10"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/nYx8CjFE2xjuUmK9LMfMdjcpJdO.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65d11"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65d14"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/3TUOhZhM5GCYIbxwFO3chpZ0DHx.jpg",
        "genres": [
            "['drama', 'crime', 'romance']"
        ],
        "id": "62c4833328dd2eb1a7f65d1a"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/xXmlqE0MbFSdahlVgLbSBLCi1c5.jpg",
        "genres": [
            "['drama', 'music']"
        ],
        "id": "62c4833328dd2eb1a7f65d2c"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/A451g3fu5e3BwWTXS7IjuOXvegf.jpg",
        "genres": [
            "['crime', 'drama', 'thriller', 'romance']"
        ],
        "id": "62c4833328dd2eb1a7f65d47"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/qddUI3QA7cFWO79FW7uxMwtIa4C.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65d49"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/cGB0TZ27GXUTaBIxhf7IBPiHXzr.jpg",
        "genres": [
            "['drama', 'comedy', 'crime', 'romance']"
        ],
        "id": "62c4833328dd2eb1a7f65d5d"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/rt7cpEr1uP6RTZykBFhBTcRaKvG.jpg",
        "genres": [
            "['thriller', 'crime', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65d62"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/5VRYeJ8DI3GkVzO7MUlug8v2BZO.jpg",
        "genres": [
            "['drama', 'european']"
        ],
        "id": "62c4833328dd2eb1a7f65d67"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/wdRVfwsdXpN7H4p8Ydnr90Ym5d3.jpg",
        "genres": [
            "['crime', 'drama', 'comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65d71"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65d75"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "[]"
        ],
        "id": "62c4833328dd2eb1a7f65d79"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/bgDsFoeyhefb0LjOcF8PO3f93id.jpg",
        "genres": [
            "['documentation', 'music']"
        ],
        "id": "62c4833328dd2eb1a7f65d88"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/fXmxDFdBsULlQyKeb2vRrL88E80.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833328dd2eb1a7f65d8f"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65d95"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/xzrSiQuiSb5hKePkU9AFuCcgRxE.jpg",
        "genres": [
            "['romance', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65d98"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['romance', 'drama']"
        ],
        "id": "62c4833328dd2eb1a7f65d9a"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/hkUcYS06DMxERUkGSXLGaNDU6Jr.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833328dd2eb1a7f65d9b"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/xUnvKe1vDIQeCQhkWbqTtldUW1N.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833328dd2eb1a7f65d9f"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/l2TWB9dqxlcRgG4JJDa4BYiBAOQ.jpg",
        "genres": [
            "['action', 'thriller']"
        ],
        "id": "62c4833328dd2eb1a7f65da9"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/fLUjoFgRoO8vfAyENbTVLBmzWgp.jpg",
        "genres": [
            "['action', 'crime', 'drama']"
        ],
        "id": "62c4833428dd2eb1a7f65dad"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/6UuD9J3EXGH3E7jKtI3FaqlarBy.jpg",
        "genres": [
            "['documentation', 'music']"
        ],
        "id": "62c4833428dd2eb1a7f65dae"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/5EKvQJgLg0wX4uYq9WhBlq3pxD5.jpg",
        "genres": [
            "['music', 'documentation']"
        ],
        "id": "62c4833428dd2eb1a7f65db8"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/9dieUbTLijMnE9gKV8qt4Byc6Cx.jpg",
        "genres": [
            "['thriller', 'crime', 'drama']"
        ],
        "id": "62c4833428dd2eb1a7f65dc1"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/sV3kIAmvJ9tPz4Lq5fuf9LLMxte.jpg",
        "genres": [
            "['horror', 'thriller', 'action', 'crime']"
        ],
        "id": "62c4833428dd2eb1a7f65dc3"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/ycePcddfSvqaalyPxMvFYT5D8wV.jpg",
        "genres": [
            "['drama', 'romance', 'european']"
        ],
        "id": "62c4833428dd2eb1a7f65dc9"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/dqsx54wzgjzWPzh4kRxUMzSj0fV.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833428dd2eb1a7f65dcc"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/qAMjlWdcl27yYomMUZdiv1dlTsn.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833428dd2eb1a7f65dce"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/BarQZoByfUMdKcah5XTgCqYGLa.jpg",
        "genres": [
            "['crime', 'documentation']"
        ],
        "id": "62c4833428dd2eb1a7f65dd6"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/3f2KrEoOTmQxfDWgeqqLQ1rCYWP.jpg",
        "genres": [
            "['drama', 'action', 'sport']"
        ],
        "id": "62c4833428dd2eb1a7f65ddb"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/xAqx1Ss4MRBqLyCB2ICNrnr0D9V.jpg",
        "genres": [
            "['documentation', 'sport']"
        ],
        "id": "62c4833428dd2eb1a7f65dea"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/pfq6KbmlrU6DAbaPNLZjQnWs0dA.jpg",
        "genres": [
            "['music', 'documentation']"
        ],
        "id": "62c4833428dd2eb1a7f65dec"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/lZaTjGXDcc5GMM8En0kIj7v2Ric.jpg",
        "genres": [
            "['music', 'documentation']"
        ],
        "id": "62c4833428dd2eb1a7f65dfe"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['music', 'animation', 'action', 'comedy', 'drama', 'fantasy']"
        ],
        "id": "62c4833428dd2eb1a7f65e06"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['family']"
        ],
        "id": "62c4833428dd2eb1a7f65e0b"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/iMwu6ZiYtudqXneMbUjUaU8XsGk.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833428dd2eb1a7f65e0d"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/aI3qGxN4vNKZ66ba82texbC3FTn.jpg",
        "genres": [
            "['comedy']"
        ],
        "id": "62c4833428dd2eb1a7f65e0e"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/3HwH3RTBB7mS3RjCyfKuxxqiySO.jpg",
        "genres": [
            "['documentation', 'crime']"
        ],
        "id": "62c4833428dd2eb1a7f65e21"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/5svMKCGnR6Yvj8wxldvDvgUi0Jk.jpg",
        "genres": [
            "['drama', 'crime']"
        ],
        "id": "62c4833428dd2eb1a7f65e23"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/d9J86BpP7NLreJJ9VCbr1SDMRii.jpg",
        "genres": [
            "['thriller', 'war', 'drama']"
        ],
        "id": "62c4833428dd2eb1a7f65e31"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/aP8swke3gmowbkfZ6lmNidu0y9p.jpg",
        "genres": [
            "['thriller', 'action']"
        ],
        "id": "62c4833428dd2eb1a7f65e34"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/frZj5djlU9hFEjMcL21RJZVuG5O.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833428dd2eb1a7f65e35"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833428dd2eb1a7f65e36"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833428dd2eb1a7f65e37"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/d6Rk7YqHOILU3siwBPrDM0wgh23.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833428dd2eb1a7f65e38"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/bjvxSGfghSNTgfVDf3nQ4sJCVJX.jpg",
        "genres": [
            "['crime', 'documentation', 'sport']"
        ],
        "id": "62c4833428dd2eb1a7f65e3a"
    },
    {
        "link": "https://img.freepik.com/premium-vector/movie-night-cinema-flat-poster_118124-966.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833428dd2eb1a7f65e3c"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/rELI3de6VSVoabNwHCn9bbPKvA8.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833428dd2eb1a7f65e42"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/4myDtowDJQPQnkEDB1IWGtJR1Fo.jpg",
        "genres": [
            "['drama', 'romance']"
        ],
        "id": "62c4833428dd2eb1a7f65e44"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/vTQMCZYB3txbAcGOdFIkKpK6xnk.jpg",
        "genres": [
            "['music', 'documentation']"
        ],
        "id": "62c4833428dd2eb1a7f65e45"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/pdEgV6PckeiVcnComUw8bOirrpC.jpg",
        "genres": [
            "['documentation']"
        ],
        "id": "62c4833428dd2eb1a7f65e47"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/cwB0t4OHX1Pw1Umzc9jPgzalUpS.jpg",
        "genres": [
            "['thriller', 'crime', 'drama']"
        ],
        "id": "62c4833428dd2eb1a7f65e4e"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/6YJAERl1HSvY0HdWe3jGz1W3QNH.jpg",
        "genres": [
            "['thriller', 'crime']"
        ],
        "id": "62c4833428dd2eb1a7f65e5b"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/raYnFIAXuxl3GwVPg1GkODi9dVq.jpg",
        "genres": [
            "['romance', 'european', 'drama']"
        ],
        "id": "62c4833428dd2eb1a7f65e62"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/5jHnykugFB3awLTwDM5LQ93TIzs.jpg",
        "genres": [
            "['action', 'comedy', 'drama', 'fantasy', 'scifi']"
        ],
        "id": "62c4833428dd2eb1a7f65e65"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/iUgeT99RHVdqkExrW7X0poE0BIB.jpg",
        "genres": [
            "['drama', 'family']"
        ],
        "id": "62c4833428dd2eb1a7f65e6e"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/6EJ4JoTxnH1QmGTE9pPzgtW1cLW.jpg",
        "genres": [
            "['drama', 'romance']"
        ],
        "id": "62c4833428dd2eb1a7f65e76"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/uLnYMDbVYgPd9Y8Cqb2MeWBIOkS.jpg",
        "genres": [
            "['drama']"
        ],
        "id": "62c4833428dd2eb1a7f65e79"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/w0KJAcLcJPwQ7GMCINbxUVo1qDj.jpg",
        "genres": [
            "['drama', 'thriller']"
        ],
        "id": "62c4833428dd2eb1a7f65e81"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/eQzsFDxInDovC8CIyEAFdWv2ube.jpg",
        "genres": [
            "[]"
        ],
        "id": "62c4833428dd2eb1a7f65e8e"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/xqPgfr8nB5qMXfQJK3hylKKov55.jpg",
        "genres": [
            "['documentation', 'sport']"
        ],
        "id": "62c4833428dd2eb1a7f65e98"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/pNcwhz3Eyfn3KQ2XykTozbARMpr.jpg",
        "genres": [
            "['drama', 'european', 'crime', 'horror', 'thriller']"
        ],
        "id": "62c4833428dd2eb1a7f65ea3"
    },
    {
        "link": "https://image.tmdb.org/t/p/w500/7Kk1ZsrAul2Lg7Pe45XOcUf2ARQ.jpg",
        "genres": [
            "['fantasy', 'war', 'drama']"
        ],
        "id": "62c4833428dd2eb1a7f65ea7"
    }
]

const user = {
    id: '4',
    name: 'Sam',
    status: true,
    host: true,
    address: '123 Main St, 12345',
    date: 'July 4, 2022'
}

const userX = {
    id: '3',
    name: 'Lauren',
    status: false,
    host: false
}


export default ({navigation, route}) => {
    const [votingStatus, setVotingStatus] = useState() //state of voting period, state of users list, state of users voted status
    const [users, setUsers] = useState() //keeps track of users + adding new users 
    const [films, setFilms] = useState() //storing a collection of 10 films with top scorings that are not seen or is "will watch again movie"
    
    //needs to take an a parameter for party ID to load in the information. 

    //pull in list -> check different attributes to see for that party
    //voted + not yet will be checked in status for each user
    //used buttons for users so you can press to see each profile maybe
    //press to vote button 
    //Add to group
    //recommend button closes out voting status and makes a recommendation ONLY if you're host
    return(
        <View style={styles.container}>
            <View style={{textAlign:'center', marginBottom: 10}}>
                <Text style={styles.textMain}>
                    {`Movie Night At ${attendees[3].name}'s`}
                </Text>
                <Text style={styles.textMain}>
                    {`Date: ${attendees[3].date}`}
                </Text>
                <Text style={styles.textMain}>
                    {`Location: ${attendees[3].address}`}
                </Text>
            </View>
            <View>
                <Text style={styles.textMain}>Host</Text>
                <Button style={styles.user}>{attendees[3].name}</Button>
            </View>
            <View>
                <Text style={styles.textMain}>Attendees</Text>
                {attendees === undefined ? [] : attendees.map((person,idx) => {
                    if(!person.host){
                        return (
                            <Button style={styles.user} key={idx}>{person.name}</Button>
                        )
                    }
                })}
            </View>
            <View style={styles.btnRow}>
                <Button 
                    onPress={() => navigation.push('MovieCard', {movies: movies})}
                >Press to Vote</Button>
                <Button
                    onPress={() => navigation.push('PartyAddForm', {attendees: attendees})}
                >Add to group</Button>
            </View>
            {user !== undefined && user.host ? 
            <Button style={{height: 55, borderRadius: 10, width: '75%', alignSelf:'center', marginTop: 20}}>Recommend</Button> : 
            <View />
            }
        </View>
    )
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
      height:'100%',
      width: '100%',
      backgroundColor: `rgba(164,198,156,1)`
    },
    textMain: {
        fontSize: 20,
        fontWeight:'bold'
    }
    ,
    btn:{
        height: 55, 
        borderRadius: 10,
        width: 100,
        justifyContent: 'center',
        backgroundColor: '#8A9D8C',
        alignSelf:'center'
    },
    btnRow:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:20,
        justifyContent:'space-evenly'
    },
    user:{
        height: 55, 
        borderRadius: 10, 
        width: '75%', 
        alignSelf:'center',
        marginTop: 7,
        textAlign: 'justify'
    }
});