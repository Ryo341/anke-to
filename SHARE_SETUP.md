# 公開共有手順（誰でも閲覧可）

## 1. GitHub にアップロード
1. GitHubで新規リポジトリを作成
2. このフォルダの中身を `main` ブランチに push

## 2. GitHub Pages を有効化
1. リポジトリの `Settings` → `Pages`
2. `Source` を `GitHub Actions` に設定
3. push後、`Actions` タブで `Deploy Static Site to GitHub Pages` が成功することを確認

## 3. 共有URL
- 公開URLは以下形式になります  
  `https://<GitHubユーザー名>.github.io/<リポジトリ名>/`

## 4. GAS連携の前提
- `index.html` の `GAS_WEB_APP_URL` は必ず本番URLに差し替える
- GAS側のウェブアプリ公開設定は `アクセスできるユーザー: 全員`

## 補足
- 画像は `images/` に配置したままで公開されます
- 更新したら `main` に push するだけで自動反映されます
