<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Http\Resources\BlogResource;
use Exception;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return BlogResource::collection(Blog::where('user_id', Auth::user()->id)->get()->sortByDesc('created_at'));
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
        try {
            $data = $request->validated();
            $blog = Blog::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'user_id' => Auth::user()->id
            ]);
            return response(new BlogResource($blog), 201);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
     return new BlogResource($blog);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        try {
            $data = $request->validated();
            $blog->update([
                'title' => $data['title'],
                'description' => $data['description'],
                'user_id' => Auth::user()->id
            ]);
            return new BlogResource($blog);
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
        return response(null, 204);
    }
}
