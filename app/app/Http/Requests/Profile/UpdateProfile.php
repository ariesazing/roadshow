<?php
namespace App\Http\Requests\Profile;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfile extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'last_name'      => 'required|string|max:50',
            'first_name'     => 'required|string|max:50',
            'middle_initial' => 'nullable|string|max:5',
            'phone_number'   => 'nullable|string|max:20',
            'birthdate'      => 'nullable|date',
            'email'          => ['required', 'email', 'max:255', Rule::unique('profiles')->ignore($this->profile->id)],
        ];
    }
}
