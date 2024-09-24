<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(SignupRequest $request)
    {
        try {
            $data = $request->validated();

            /** @var \App\Models\User $user */

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $token = $user->createToken('token')->plainTextToken;

            return response(compact('user', 'token'));
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ]);
        }
    }
    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->validated();

            if (!Auth::attempt($credentials)) {
                return response([
                    'message' => 'Provided credentials are not correct'
                ], 422);
            }

            /** @var \App\Models\User $user */
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;

            return response(compact('user', 'token'));
        } catch (Exception $e) {
            return response([
                'message' => $e->getMessage()
            ]);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
