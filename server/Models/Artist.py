from dataclasses import dataclass
import datetime


@dataclass
class Artist:
    id: str
    name: str
    image_url: str
    bio: str
    votes: int

    def to_dict(self):
        return {
            "name": self.name,
            "image_url": self.image_url,
            "bio": self.bio,
            "votes": self.votes
        }

    @staticmethod
    def from_dict(data, id=None):
        return Artist(
            id=id,
            name=data["name"],
            image_url=data["image_url"],
            bio=data["bio"],
            votes=data["votes"]
        )
