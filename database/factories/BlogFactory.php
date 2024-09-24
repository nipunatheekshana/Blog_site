<?php

namespace Database\Factories;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Blog::class;
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),  // Generate a random sentence for the title
            'description' => $this->faker->paragraph(),  // Generate a random paragraph for the description
            'user_id' => 1,  // Create a user and associate it with the blog
        ];
    }
}
