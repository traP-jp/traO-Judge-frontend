<script setup lang="ts"></script>

<template>
  <div class="rounded-lg border border-solid border-[#D8D8D8] pt-28 text-center">
    <h2 class="fontstyle-ui-title-large">提出一覧<br />テーブル</h2>
    <section class="p-10">
      <table class="w-full table-fixed">
        <thead class="h-10 bg-[#F5F5F5]">
          <tr>
            <th>提出日時</th>
            <th>ユーザー名</th>
            <th>得点</th>
            <th>コード長</th>
            <th>ジャッジ結果</th>
            <th>実行時間</th>
            <th>メモリ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1234/56/78 90:56:78</td>
            <td>test_user</td>
            <td>400</td>
            <td>2048 Byte</td>
            <td>AC</td>
            <td>123 ms</td>
            <td>12345 KB</td>
          </tr>
          <tr>
            <td>1234/56/78 90:45:67</td>
            <td>test_user</td>
            <td>0</td>
            <td>2048 Byte</td>
            <td>WA</td>
            <td>123 ms</td>
            <td>12345 KB</td>
          </tr>
          <tr>
            <td>1234/56/78 90:34:56</td>
            <td>test_user</td>
            <td>300</td>
            <td>1024 Byte</td>
            <td>AC</td>
            <td>12 ms</td>
            <td>12345 KB</td>
          </tr>
          <tr>
            <td>1234/56/78 90:23:45</td>
            <td>test_user</td>
            <td>200</td>
            <td>512 Byte</td>
            <td>AC</td>
            <td>12 ms</td>
            <td>12345 KB</td>
          </tr>
          <tr>
            <td>1234/56/78 90:12:34</td>
            <td>test_user</td>
            <td>100</td>
            <td>256 Byte</td>
            <td>AC</td>
            <td>1 ms</td>
            <td>1234 KB</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped></style>
