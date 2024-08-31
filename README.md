# X (Twitter) Feed Filter Browser Extension

This project is a browser extension that filters the news feed on X (formerly Twitter) based on user-selected subjects. It allows users to customize their feed by showing only the content they're interested in, enhancing their browsing experience on the platform.

## How It Works

1. The extension integrates with X's web interface.
2. Users can select their preferred subjects through the extension settings.
3. When browsing X, the extension analyzes each item in the news feed.
4. Items that don't match the user's selected subjects are filtered out.
5. The result is a customized feed showing only relevant content.

## Features

- Subject-based filtering of X's news feed
- Customizable subject selection through extension settings
- Real-time filtering as new content loads

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/GauravWaghmare/news-feed-filter
   ```
2. Navigate to the project directory:
   ```
   cd news-feed-filter
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Development

To run the extension in development mode:

1. Start the development server:
   ```
   npm run dev
   ```
2. Load the extension in your browser:
   - Chrome: Go to `chrome://extensions/`, enable "Developer mode", and click "Load unpacked". Select the `build/chrome-mv3-dev` directory.
   - Firefox: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select any file in the `build/firefox-mv2-dev` directory.

## Building for Production

To create a production build:

1. Run the build command:
   ```
   npm run build
   ```
2. The production-ready extension will be in the `build` directory.

## Usage

1. Install the extension in your browser.
2. Click the extension icon in your browser toolbar to open the extension settings.
3. Select the subjects you're interested in from the provided options.
4. Browse X as normal - your feed will now be filtered based on your selections.
5. To change your subject preferences, simply open the extension settings again and adjust your selections.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
