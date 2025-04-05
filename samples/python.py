#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Toy Chest Theme - Sample Python File
This file demonstrates how the theme highlights different Python elements.
"""

import os
import sys
import json
from typing import List, Dict, Optional, Union
from dataclasses import dataclass
from enum import Enum, auto


# Constants
MAX_TOYS = 100
PI = 3.14159
AVAILABLE = True
THEME_NAME = "Toy Chest"


class ToyCategory(Enum):
    """Enum representing different toy categories."""
    BUILDING = auto()
    ACTION_FIGURE = auto()
    PUZZLE = auto()
    VEHICLE = auto()
    PLUSH = auto()
    ELECTRONIC = auto()


@dataclass
class ToyColor:
    """Class for storing color information."""
    name: str
    hex_code: str
    rgb: tuple

    def __post_init__(self):
        """Validate the hex code format."""
        if not self.hex_code.startswith('#') or len(self.hex_code) != 7:
            raise ValueError(f"Invalid hex code: {self.hex_code}")


class Toy:
    """
    Represents a toy in the toy chest.
    
    Attributes:
        name (str): The name of the toy
        color (ToyColor): The color of the toy
        age_recommendation (int): Recommended minimum age
        category (ToyCategory): The category of the toy
    """
    
    # Class variable to track the number of toys
    count = 0
    
    def __init__(self, name: str, color: ToyColor, age: int, category: ToyCategory):
        """
        Initialize a new toy.
        
        Args:
            name: The toy's name
            color: The toy's color
            age: Recommended minimum age
            category: The toy's category
        """
        self.name = name
        self.color = color
        self.age_recommendation = age
        self.category = category
        self.id = f"toy-{Toy.count}"
        Toy.count += 1
    
    def is_appropriate_for(self, child_age: int) -> bool:
        """
        Check if the toy is appropriate for a given age.
        
        Args:
            child_age: The child's age
            
        Returns:
            Whether the toy is appropriate
        """
        return child_age >= self.age_recommendation
    
    def get_description(self) -> str:
        """
        Get a description of the toy.
        
        Returns:
            The toy description
        """
        return f"{self.name} ({self.color.name}) - For ages {self.age_recommendation}+"
    
    @classmethod
    def get_count(cls) -> int:
        """
        Get the total number of toys created.
        
        Returns:
            The toy count
        """
        return cls.count
    
    def __str__(self) -> str:
        return self.get_description()
    
    def __repr__(self) -> str:
        return f"Toy(name='{self.name}', color={self.color}, age={self.age_recommendation})"


# Create some toy colors using the theme colors
colors = {
    "building_block_blue": ToyColor("Building Block Blue", "#23364a", (35, 54, 74)),
    "action_figure_green": ToyColor("Action Figure Green", "#30cf7b", (48, 207, 123)),
    "puzzle_purple": ToyColor("Puzzle Purple", "#5f207a", (95, 32, 122)),
    "race_car_red": ToyColor("Race Car Red", "#be2d26", (190, 45, 38)),
    "rubber_duck_yellow": ToyColor("Rubber Duck Yellow", "#e7d74b", (231, 215, 75)),
    "robot_cyan": ToyColor("Robot Cyan", "#41c3ad", (65, 195, 173))
}


def create_toy_chest() -> List[Toy]:
    """
    Create a collection of toys.
    
    Returns:
        A list of Toy objects
    """
    toy_chest = [
        Toy("Building Blocks", colors["building_block_blue"], 3, ToyCategory.BUILDING),
        Toy("Action Figure", colors["action_figure_green"], 5, ToyCategory.ACTION_FIGURE),
        Toy("Puzzle", colors["puzzle_purple"], 4, ToyCategory.PUZZLE),
        Toy("Race Car", colors["race_car_red"], 6, ToyCategory.VEHICLE),
        Toy("Rubber Duck", colors["rubber_duck_yellow"], 1, ToyCategory.PLUSH),
        Toy("Robot", colors["robot_cyan"], 8, ToyCategory.ELECTRONIC)
    ]
    return toy_chest


def filter_toys_by_age(toys: List[Toy], age: int) -> List[Toy]:
    """
    Filter toys by recommended age.
    
    Args:
        toys: List of toys to filter
        age: The age to filter by
        
    Returns:
        Filtered list of toys
    """
    return [toy for toy in toys if toy.is_appropriate_for(age)]


def save_toys_to_json(toys: List[Toy], filename: str) -> None:
    """
    Save toys to a JSON file.
    
    Args:
        toys: List of toys to save
        filename: Name of the file to save to
    """
    try:
        with open(filename, 'w') as f:
            # Convert toys to dictionaries
            toy_dicts = [{
                'name': toy.name,
                'color': {
                    'name': toy.color.name,
                    'hex_code': toy.color.hex_code
                },
                'age_recommendation': toy.age_recommendation,
                'category': toy.category.name
            } for toy in toys]
            
            json.dump(toy_dicts, f, indent=2)
        print(f"Saved {len(toys)} toys to {filename}")
    except Exception as e:
        print(f"Error saving toys: {e}")


def main():
    """Main function to demonstrate the toy chest."""
    print(f"Welcome to the {THEME_NAME} Toy Chest!")
    
    # Create the toy chest
    toy_chest = create_toy_chest()
    print(f"Created {len(toy_chest)} toys")
    
    # Filter toys for a 5-year-old
    age = 5
    appropriate_toys = filter_toys_by_age(toy_chest, age)
    
    # Print the results
    print(f"\nToys appropriate for a {age}-year-old:")
    for toy in appropriate_toys:
        print(f"- {toy}")
    
    # Conditional expression
    message = f"Found {len(appropriate_toys)} appropriate toys!" if appropriate_toys else "No appropriate toys found."
    print(message)
    
    # Save to JSON
    save_toys_to_json(toy_chest, "toy_chest.json")


if __name__ == "__main__":
    main()
